/**
 * Maintainer helper for `npm run verify`.
 * Imports many exercise files in ONE process (much faster than one process each)
 * and prints a JSON array of { file, ok, output } as the last line of stdout.
 */
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"

const files = process.argv.slice(2)
const real = { log: console.log, error: console.error, write: process.stdout.write.bind(process.stdout) }

let current: Array<string> = []
let asyncError: string | undefined
const describeError = (e: unknown): string => (e instanceof Error ? e.message : `uncaught: ${String(e)}`)
process.on("uncaughtException", (e) => {
  asyncError = describeError(e)
})
process.on("unhandledRejection", (e) => {
  asyncError = describeError(e)
})

const results: Array<{ file: string; ok: boolean; output: string }> = []
for (const file of files) {
  current = []
  asyncError = undefined
  console.log = (...args: Array<unknown>) => void current.push(args.map(String).join(" "))
  console.error = console.log
  process.exitCode = 0
  let error: string | undefined
  let timer: NodeJS.Timeout | undefined
  try {
    await Promise.race([
      import(pathToFileURL(resolve(file)).href),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("timed out after 20s")), 20_000)
      })
    ])
  } catch (e) {
    error = describeError(e)
  }
  clearTimeout(timer)
  await new Promise((r) => setTimeout(r, 0))
  error ??= asyncError
  const code = process.exitCode
  console.log = real.log
  console.error = real.error
  results.push({
    file,
    ok: error === undefined && (code === 0 || code === undefined),
    output: [...current, ...(error === undefined ? [] : [error])].join("\n")
  })
}
process.exitCode = 0
real.write(JSON.stringify(results) + "\n")
process.exit(0)
