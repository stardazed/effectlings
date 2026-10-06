/**
 * Maintainer tool. Not needed to do the exercises.
 *
 *   npm run build:exercises            generate exercises/, solutions/, info.json, LEDGER.md
 *   npm run build:exercises -- --lint  lint only
 *
 * Authoring files live in authoring/<chapter>/<nn>_<slug>.ts and use directives:
 *
 *   //#title   Short title shown by the CLI
 *   //#kind    fix | complete | translate
 *   //#hint    one hint (repeat for several, easiest first)
 *   //#teaches Effect.map, .pipe      first lesson that introduces these tokens
 *   //#deepens Effect.succeed         revisits something already taught
 *   //#later   Layer.succeed          used here on purpose before its lesson
 *
 *   //#solution ... //#exercise ... //#end   solution-only / exercise-only blocks
 *   everything else is shared by both files.
 *
 * The linter checks every Module.member (and pipe, .pipe, yield*) used in code:
 * it must be taught earlier, taught here, or declared with //#later.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const authoringDir = join(root, "authoring")
const lintOnly = process.argv.includes("--lint")
const force = process.argv.includes("--force")

interface Parsed {
  readonly path: string // chapter/file.ts
  title: string
  kind: string
  hints: Array<string>
  teaches: Array<string>
  deepens: Array<string>
  later: Array<string>
  exerciseText: string
  solutionText: string
}

const list = (s: string): Array<string> =>
  s.split(",").map((x) => x.trim()).filter((x) => x.length > 0)

const parse = (path: string, text: string): Parsed => {
  const p: Parsed = {
    path, title: "", kind: "", hints: [], teaches: [], deepens: [], later: [],
    exerciseText: "", solutionText: ""
  }
  const ex: Array<string> = []
  const sol: Array<string> = []
  let mode: "both" | "solution" | "exercise" = "both"
  for (const line of text.split("\n")) {
    const t = line.trim()
    const m = t.match(/^\/\/#(\w+)\s*(.*)$/)
    if (m === null) {
      if (mode !== "solution") ex.push(line)
      if (mode !== "exercise") sol.push(line)
      continue
    }
    const [, key, rest] = m
    switch (key) {
      case "title": p.title = rest; break
      case "kind": p.kind = rest; break
      case "hint": p.hints.push(rest); break
      case "teaches": p.teaches.push(...list(rest)); break
      case "deepens": p.deepens.push(...list(rest)); break
      case "later": p.later.push(...list(rest)); break
      case "solution": mode = "solution"; break
      case "exercise": mode = "exercise"; break
      case "end": mode = "both"; break
      default: throw new Error(`${path}: unknown directive //#${key}`)
    }
  }
  p.exerciseText = ex.join("\n")
  p.solutionText = sol.join("\n")
  return p
}

const insertMarker = (path: string, text: string): string => {
  const lines = text.split("\n")
  const start = lines.findIndex((l) => l.trim().startsWith("/**"))
  if (start < 0) throw new Error(`${path}: missing /** header */ comment`)
  let end = start
  while (!lines[end].includes("*/")) end++
  lines.splice(end + 1, 0, "// I AM NOT DONE")
  return lines.join("\n")
}

// ---------------------------------------------------------------- lint

const stripComments = (code: string): string =>
  code
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .map((l) => l.replace(/(^|[^:])\/\/.*$/, "$1"))
    .join("\n")

const tokensOf = (code: string): Set<string> => {
  const src = stripComments(code)
  const tokens = new Set<string>()
  const names: Array<string> = []
  for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from\s*"effect(?:\/[A-Za-z\/]+)?"/g)) {
    for (const raw of m[1].split(",")) {
      const cleaned = raw.replace(/\btype\b/, "").trim()
      const n = cleaned.includes(" as ") ? cleaned.split(" as ")[1].trim() : cleaned
      if (n.length > 0) names.push(n)
    }
  }
  for (const n of names) {
    if (/^[A-Z]/.test(n)) {
      for (const m of src.matchAll(new RegExp(`\\b${n}\\.([A-Za-z_][A-Za-z0-9_]*)`, "g"))) tokens.add(`${n}.${m[1]}`)
    } else if (new RegExp(`(?<![.\\w])${n}\\(`).test(src)) tokens.add(n)
  }
  if (/\.pipe\(/.test(src)) tokens.add(".pipe")
  if (/yield\*/.test(src)) tokens.add("yield*")
  return tokens
}

const lint = (all: ReadonlyArray<Parsed>): { errors: Array<string>; warnings: Array<string> } => {
  const errors: Array<string> = []
  const warnings: Array<string> = []
  const taught = new Map<string, string>()
  const pendingLater = new Map<string, string>()
  const titles = new Map<string, string>()
  for (const p of all) {
    if (p.title === "" || p.kind === "") errors.push(`${p.path}: missing //#title or //#kind`)
    if (!["fix", "complete", "translate"].includes(p.kind)) errors.push(`${p.path}: bad kind "${p.kind}"`)
    if (p.hints.length < 2) errors.push(`${p.path}: needs at least 2 //#hint lines`)
    const prevTitle = titles.get(p.title)
    if (prevTitle !== undefined) errors.push(`${p.path}: duplicate title "${p.title}" (also ${prevTitle})`)
    titles.set(p.title, p.path)

    const used = new Set([...tokensOf(p.solutionText), ...tokensOf(p.exerciseText)])
    const usedInSolution = tokensOf(p.solutionText)
    for (const t of p.teaches) {
      const earlier = taught.get(t)
      if (earlier !== undefined) errors.push(`${p.path}: DUPE "${t}" already taught in ${earlier} (use //#deepens)`)
      if (!usedInSolution.has(t)) warnings.push(`${p.path}: teaches "${t}" but the solution never uses it`)
    }
    for (const d of p.deepens) {
      if (!taught.has(d) && !p.teaches.includes(d)) errors.push(`${p.path}: deepens "${d}" which is not taught earlier`)
    }
    for (const t of p.teaches) {
      if (pendingLater.has(t)) pendingLater.delete(t)
      taught.set(t, p.path)
    }
    for (const u of used) {
      if (taught.has(u) || p.later.includes(u)) {
        if (!taught.has(u)) pendingLater.set(u, p.path)
        continue
      }
      errors.push(`${p.path}: EARLY use of "${u}" (not taught yet; add to //#teaches or //#later)`)
    }
    for (const l of p.later) if (!used.has(l)) warnings.push(`${p.path}: //#later "${l}" is not used here`)
  }
  for (const [t, where] of pendingLater) warnings.push(`${where}: //#later "${t}" is never taught afterwards`)
  return { errors, warnings }
}

// ---------------------------------------------------------------- main

const chapters = readdirSync(authoringDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()

const parsed: Array<Parsed> = []
for (const ch of chapters) {
  const files = readdirSync(join(authoringDir, ch)).filter((f) => f.endsWith(".ts")).sort()
  for (const f of files) parsed.push(parse(`${ch}/${f}`, readFileSync(join(authoringDir, ch, f), "utf8")))
}

const { errors, warnings } = lint(parsed)
for (const w of warnings) console.log(`warn  ${w}`)
for (const e of errors) console.log(`ERROR ${e}`)
console.log(`${parsed.length} exercises, ${errors.length} error(s), ${warnings.length} warning(s)`)
if (errors.length > 0) process.exit(1)
if (lintOnly) process.exit(0)

if (existsSync(join(root, ".effectlings", "progress.json")) && !force) {
  console.log("Refusing to overwrite exercises: progress exists. Re-run with --force.")
  process.exit(1)
}

for (const dir of ["exercises", "solutions"]) {
  rmSync(join(root, dir), { recursive: true, force: true })
  mkdirSync(join(root, dir), { recursive: true })
}
for (const p of parsed) {
  for (const [dir, text] of [["exercises", insertMarker(p.path, p.exerciseText)], ["solutions", p.solutionText]] as const) {
    const out = join(root, dir, p.path)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, text.replace(/\n{3,}/g, "\n\n").replace(/\s+$/, "") + "\n")
  }
}
writeFileSync(
  join(root, "exercises", "info.json"),
  JSON.stringify({ exercises: parsed.map((p) => ({ path: p.path, title: p.title, kind: p.kind, hints: p.hints })) }, null, 2) + "\n"
)

const rows = parsed.map(
  (p, i) => `| ${i + 1} | ${p.path} | ${p.kind} | ${p.teaches.join(", ")} | ${p.deepens.join(", ")} |`
)
writeFileSync(
  join(authoringDir, "LEDGER.md"),
  ["# Concept ledger", "", "| # | file | kind | teaches | deepens |", "|---|---|---|---|---|", ...rows, ""].join("\n")
)
console.log(`wrote exercises/, solutions/, exercises/info.json, authoring/LEDGER.md`)
