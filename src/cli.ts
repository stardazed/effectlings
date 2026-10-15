import { spawn } from "node:child_process"
import { cpSync, existsSync, mkdirSync, readFileSync, watch, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { emitKeypressEvents } from "node:readline"
import { fileURLToPath } from "node:url"

// ---------------------------------------------------------------- paths

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const exercisesDir = join(root, "exercises")
const solutionsDir = join(root, "solutions")
const stateDir = join(root, ".effectlings")
const tmpDir = join(stateDir, "tmp")
const originalDir = join(stateDir, "original")
const progressFile = join(stateDir, "progress.json")
const infoFile = join(exercisesDir, "info.json")
const tscBin = join(root, "node_modules", "typescript", "bin", "tsc")

// ---------------------------------------------------------------- output

const tty = process.stdout.isTTY === true
const paint = (code: number) => (s: string) => (tty ? `\u001b[${code}m${s}\u001b[0m` : s)
const green = paint(32)
const red = paint(31)
const yellow = paint(33)
const dim = paint(2)
const bold = paint(1)

// ---------------------------------------------------------------- data

interface Info {
  readonly path: string
  readonly title: string
  readonly kind: string
  readonly hints: ReadonlyArray<string>
}

interface Progress {
  done: Array<string>
  hints: Record<string, number>
}

const loadInfo = (): ReadonlyArray<Info> => {
  if (!existsSync(infoFile)) {
    console.error(red("exercises/info.json is missing. Run `npm run build:exercises` first."))
    process.exit(1)
  }
  return (JSON.parse(readFileSync(infoFile, "utf8")) as { exercises: Array<Info> }).exercises
}

const loadProgress = (): Progress => {
  if (!existsSync(progressFile)) return { done: [], hints: {} }
  return JSON.parse(readFileSync(progressFile, "utf8")) as Progress
}

const saveProgress = (p: Progress): void => {
  mkdirSync(stateDir, { recursive: true })
  writeFileSync(progressFile, JSON.stringify(p, null, 2) + "\n")
}

// Keep a pristine copy of every exercise so `reset` can restore it.
// Files are copied one by one, so exercises added later by an update are covered too.
const ensureSnapshot = (): void => {
  mkdirSync(originalDir, { recursive: true })
  for (const info of loadInfo()) {
    const target = join(originalDir, info.path)
    if (!existsSync(target)) {
      mkdirSync(dirname(target), { recursive: true })
      cpSync(join(exercisesDir, info.path), target)
    }
  }
}

// ---------------------------------------------------------------- running

const markerPattern = /^\s*\/\/\s*I AM NOT DONE\s*$/m

interface Exec {
  readonly code: number | null
  readonly out: string
}

const exec = (args: ReadonlyArray<string>, timeoutMs = 30_000): Promise<Exec> =>
  new Promise((resolvePromise) => {
    const child = spawn(process.execPath, [...args], {
      cwd: root,
      env: { ...process.env, FORCE_COLOR: "0", NO_COLOR: "1" }
    })
    let out = ""
    let timedOut = false
    child.stdout.on("data", (d) => (out += d))
    child.stderr.on("data", (d) => (out += d))
    const timer = setTimeout(() => {
      timedOut = true
      child.kill("SIGKILL")
    }, timeoutMs)
    child.on("close", (code) => {
      clearTimeout(timer)
      if (timedOut) out += `\n(stopped after ${timeoutMs / 1000}s: is there an infinite loop or a never-ending Effect?)`
      resolvePromise({ code: timedOut ? null : code, out })
    })
  })

let tmpCounter = 0

const typecheck = async (relPath: string): Promise<Exec> => {
  mkdirSync(tmpDir, { recursive: true })
  const cfg = join(tmpDir, `tsconfig.${process.pid}.${tmpCounter++}.json`)
  writeFileSync(
    cfg,
    JSON.stringify({ extends: "../../tsconfig.json", include: [], files: [`../../src/global-types.d.ts`, `../../${relPath}`] })
  )
  return exec([tscBin, "-p", cfg, "--pretty", "false"])
}

const runFile = (relPath: string): Promise<Exec> => exec(["--import", "tsx", "--import", "./src/globals.ts", relPath])

const tidyRuntime = (out: string, relPath: string): string => {
  const keep: Array<string> = []
  let frameShown = false
  const lines = out.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^\/.+\.(ts|js|mjs):\d+$/.test(line)) {
      i += 2 // skip the source excerpt Node prints above uncaught errors
      continue
    }
    if (line.startsWith("Node.js v")) continue
    if (/^\s+at /.test(line)) {
      if (!frameShown && line.includes(relPath)) {
        frameShown = true
        const m = line.match(/(exercises|solutions)\/[^):]+:\d+:\d+/)
        if (m) keep.push(dim(`        at ${m[0]}`))
      }
      continue
    }
    if (/^file:\/\/\//.test(line) || /^\s*\^+\s*$/.test(line)) continue
    if (/^node:internal/.test(line)) continue
    if (/triggerUncaughtException|--trace-uncaught|UnhandledPromiseRejection/.test(line)) continue
    keep.push(line)
  }
  let text = keep.join("\n").replace(/\n{3,}/g, "\n\n").trim()
  // A program that fails without a stack trace (for example a rejected string) prints just the value.
  if (text.length > 0 && !/\b(Error|ok |FAIL)\b/.test(text) && !text.includes("todo()")) {
    text = `The program failed with an error that was not handled:\n${text}`
  }
  return text
}

const tidyTypes = (out: string): string =>
  out
    .replace(
      /Type 'false' does not satisfy the constraint 'true'\./g,
      "The two types inside Expect<Equal<A, B>> are not identical. Compare A and B."
    )
    .replace(/Type 'true' does not satisfy the constraint 'true'\./g, "")

interface Evaluation {
  readonly typesOk: boolean
  readonly runOk: boolean
  readonly marker: boolean
  readonly typeOutput: string
  readonly runOutput: string
  readonly ok: boolean
}

const evaluate = async (relPath: string): Promise<Evaluation> => {
  const source = readFileSync(join(root, relPath), "utf8")
  const [tc, run] = await Promise.all([typecheck(relPath), runFile(relPath)])
  const typesOk = tc.code === 0
  const runOk = run.code === 0
  return {
    typesOk,
    runOk,
    marker: markerPattern.test(source),
    typeOutput: tidyTypes(tc.out.trim()),
    runOutput: tidyRuntime(run.out, relPath),
    ok: typesOk && runOk
  }
}

// ---------------------------------------------------------------- selection

const indexOf = (infos: ReadonlyArray<Info>, progress: Progress): number =>
  infos.findIndex((i) => !progress.done.includes(i.path))

const select = (infos: ReadonlyArray<Info>, arg: string | undefined, progress: Progress): number => {
  if (arg === undefined) return indexOf(infos, progress)
  if (/^\d+$/.test(arg)) {
    const n = Number(arg) - 1
    return n >= 0 && n < infos.length ? n : -1
  }
  const hits = infos.map((i, n) => [i, n] as const).filter(([i]) => i.path.includes(arg))
  return hits.length > 0 ? hits[0][1] : -1
}

const label = (infos: ReadonlyArray<Info>, n: number): string => {
  const i = infos[n]
  return `${bold(`[${n + 1}/${infos.length}]`)} ${i.path.replace(/\.ts$/, "")}  ${dim(`(${i.kind})`)}  ${i.title}`
}

// ---------------------------------------------------------------- reporting

const report = (infos: ReadonlyArray<Info>, n: number, ev: Evaluation): void => {
  const path = infos[n].path
  console.log(label(infos, n))
  console.log(dim(`file: exercises/${path}`))
  console.log("")
  if (!ev.typesOk) {
    console.log(red("Type errors:"))
    console.log(ev.typeOutput.split("\n").map((l) => "  " + l).join("\n"))
    console.log("")
  }
  if (ev.runOutput.length > 0 && (!ev.runOk || ev.runOutput.includes("  ok "))) {
    console.log(ev.runOk ? "Output:" : red("Run output:"))
    console.log(ev.runOutput.split("\n").map((l) => "  " + l).join("\n"))
    console.log("")
  }
  if (!ev.ok) {
    console.log(yellow("Not passing yet.") + dim("  Press h for a hint, l for the list, q to quit."))
  } else if (ev.marker) {
    console.log(green("Passing.") + ` Delete the line ${bold("// I AM NOT DONE")} to move on.`)
  }
}

// ---------------------------------------------------------------- commands

const checkAndRecord = async (infos: ReadonlyArray<Info>, n: number, progress: Progress): Promise<Evaluation> => {
  const ev = await evaluate(`exercises/${infos[n].path}`)
  report(infos, n, ev)
  if (ev.ok && !ev.marker && !progress.done.includes(infos[n].path)) {
    progress.done.push(infos[n].path)
    saveProgress(progress)
    console.log(green(`Done: ${infos[n].title}`))
  }
  return ev
}

const cmdRun = async (arg: string | undefined): Promise<void> => {
  ensureSnapshot()
  const infos = loadInfo()
  const progress = loadProgress()
  const n = select(infos, arg, progress)
  if (n < 0) {
    console.log(arg === undefined ? green("All exercises are done.") : red(`No exercise matches "${arg}".`))
    return
  }
  const ev = await checkAndRecord(infos, n, progress)
  process.exitCode = ev.ok && !ev.marker ? 0 : 1
}

const cmdList = (): void => {
  const infos = loadInfo()
  const progress = loadProgress()
  const current = indexOf(infos, progress)
  let chapter = ""
  infos.forEach((info, n) => {
    const [ch] = info.path.split("/")
    if (ch !== chapter) {
      chapter = ch
      const inChapter = infos.filter((i) => i.path.startsWith(ch + "/"))
      const finished = inChapter.filter((i) => progress.done.includes(i.path)).length
      console.log(`\n${bold(ch)}  ${dim(`${finished}/${inChapter.length}`)}`)
    }
    const mark = progress.done.includes(info.path) ? green("✓") : n === current ? yellow("→") : dim("·")
    console.log(`  ${mark} ${String(n + 1).padStart(3)}  ${info.path.split("/")[1].replace(/\.ts$/, "")}  ${dim(info.title)}`)
  })
  console.log(`\n${progress.done.length}/${infos.length} done`)
}

const cmdNext = (): void => {
  const infos = loadInfo()
  const n = indexOf(infos, loadProgress())
  if (n < 0) return console.log(green("All exercises are done."))
  console.log(label(infos, n))
  console.log(dim(`file: exercises/${infos[n].path}`))
}

const cmdHint = (arg: string | undefined): void => {
  const infos = loadInfo()
  const progress = loadProgress()
  const n = select(infos, arg, progress)
  if (n < 0) return console.log(red("No such exercise."))
  const info = infos[n]
  const shown = progress.hints[info.path] ?? 0
  if (shown >= info.hints.length) {
    console.log(dim("No more hints. The reference solution is at:"))
    console.log(`  solutions/${info.path}`)
    return
  }
  console.log(label(infos, n))
  console.log(`\n${yellow(`Hint ${shown + 1}/${info.hints.length}:`)} ${info.hints[shown]}`)
  progress.hints[info.path] = shown + 1
  saveProgress(progress)
}

const cmdReset = (arg: string | undefined): void => {
  if (arg === undefined) return console.log(red("Usage: npm run reset -- <number|name>"))
  ensureSnapshot()
  const infos = loadInfo()
  const progress = loadProgress()
  const n = select(infos, arg, progress)
  if (n < 0) return console.log(red(`No exercise matches "${arg}".`))
  const path = infos[n].path
  cpSync(join(originalDir, path), join(exercisesDir, path))
  progress.done = progress.done.filter((p) => p !== path)
  delete progress.hints[path]
  saveProgress(progress)
  console.log(green(`Reset ${path}`))
}

const cmdVerify = async (): Promise<void> => {
  const infos = loadInfo()
  const problems: Array<string> = []

  // 1. One type-check over the whole project.
  process.stdout.write("type-checking everything...\n")
  const tc = await exec([tscBin, "-p", join(root, "tsconfig.json"), "--pretty", "false"], 600_000)
  const typeErrors = new Map<string, Array<string>>()
  for (const line of tc.out.split("\n")) {
    const m = line.match(/^((?:exercises|solutions)\/[^(]+)\(/)
    if (m) typeErrors.set(m[1], [...(typeErrors.get(m[1]) ?? []), tidyTypes(line)])
    else if (/^src\/.+error TS/.test(line)) problems.push(`tooling: ${line}`)
  }

  // 2. Run everything that type-checks in one process.
  const toRun: Array<string> = []
  for (const info of infos) {
    if (!typeErrors.has(`solutions/${info.path}`)) toRun.push(`solutions/${info.path}`)
    if (!typeErrors.has(`exercises/${info.path}`)) toRun.push(`exercises/${info.path}`)
  }
  process.stdout.write(`running ${toRun.length} files...\n`)
  const run = await exec(["--import", "tsx", "--import", "./src/globals.ts", "src/verify-runner.ts", ...toRun], 900_000)
  let results: Array<{ file: string; ok: boolean; output: string }> = []
  try {
    results = JSON.parse(run.out.trim().split("\n").pop() ?? "[]")
  } catch {
    problems.push(`runner failed:\n${run.out}`)
  }
  const outcome = new Map(results.map((r) => [r.file, r]))

  // 3. Judge.
  for (const info of infos) {
    const solPath = `solutions/${info.path}`
    const exPath = `exercises/${info.path}`
    if (!existsSync(join(root, solPath))) {
      problems.push(`${info.path}: missing solution file`)
      continue
    }
    const solTypes = typeErrors.get(solPath)
    const solRun = outcome.get(solPath)
    if (solTypes !== undefined) problems.push(`${info.path}: SOLUTION HAS TYPE ERRORS\n${solTypes.join("\n")}`)
    else if (solRun === undefined || !solRun.ok) problems.push(`${info.path}: SOLUTION FAILS\n${solRun?.output ?? "did not run"}`)
    if (markerPattern.test(readFileSync(join(root, solPath), "utf8"))) {
      problems.push(`${info.path}: solution still has the I AM NOT DONE marker`)
    }

    const exTypes = typeErrors.get(exPath)
    const exRun = outcome.get(exPath)
    if (exTypes === undefined && exRun?.ok === true) problems.push(`${info.path}: exercise already passes without changes`)
    if (!markerPattern.test(readFileSync(join(root, exPath), "utf8"))) {
      problems.push(`${info.path}: exercise has no I AM NOT DONE marker`)
    }
    if (info.kind !== "fix" && exTypes !== undefined) {
      problems.push(`${info.path}: ${info.kind} exercise has type errors before the learner touches it\n${exTypes.join("\n")}`)
    }
    if (info.kind !== "fix" && exTypes === undefined && exRun !== undefined && !exRun.ok && !exRun.output.includes("todo()")) {
      problems.push(`${info.path}: ${info.kind} exercise fails, but not at a todo()\n${exRun.output}`)
    }
  }

  if (problems.length === 0) {
    console.log(green(`All ${infos.length} exercises verified: every solution passes, every exercise fails.`))
    return
  }
  console.log(red(`${problems.length} problem(s):`))
  for (const p of problems) console.log(`\n- ${p}`)
  process.exitCode = 1
}

const cmdWatch = async (): Promise<void> => {
  ensureSnapshot()
  let running = false
  let queued = false

  const cycle = async (): Promise<void> => {
    if (running) {
      queued = true
      return
    }
    running = true
    try {
      do {
        queued = false
        const infos = loadInfo()
        const progress = loadProgress()
        const n = indexOf(infos, progress)
        if (tty) process.stdout.write("\u001bc")
        if (n < 0) {
          console.log(green("All exercises are done. Nice work."))
          break
        }
        const ev = await checkAndRecord(infos, n, progress)
        if (ev.ok && !ev.marker) queued = true // go straight to the next one
      } while (queued)
    } finally {
      running = false
    }
  }

  let timer: NodeJS.Timeout | undefined
  watch(exercisesDir, { recursive: true }, (_event, name) => {
    if (name === null || !String(name).endsWith(".ts")) return
    clearTimeout(timer)
    timer = setTimeout(() => void cycle(), 150)
  })

  if (process.stdin.isTTY) {
    emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)
    process.stdin.on("keypress", (_s, key: { name?: string; ctrl?: boolean }) => {
      if (key.name === "q" || (key.ctrl && key.name === "c")) process.exit(0)
      if (key.name === "h") cmdHint(undefined)
      if (key.name === "l") cmdList()
      if (key.name === "r") void cycle()
    })
  }
  await cycle()
  await new Promise(() => {})
}

// ---------------------------------------------------------------- main

const [cmd = "watch", arg] = process.argv.slice(2)

switch (cmd) {
  case "watch":
    await cmdWatch()
    break
  case "run":
    await cmdRun(arg)
    break
  case "list":
    cmdList()
    break
  case "next":
    cmdNext()
    break
  case "hint":
    cmdHint(arg)
    break
  case "reset":
    cmdReset(arg)
    break
  case "verify":
    await cmdVerify()
    break
  default:
    console.log("Commands: watch (default), run [n|name], list, next, hint [n|name], reset <n|name>, verify")
    process.exitCode = 1
}
