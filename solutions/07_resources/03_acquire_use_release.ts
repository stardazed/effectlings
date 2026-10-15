/**
 * Effect.acquireUseRelease(acquire, use, release) is the safe way to work
 * with something that must be given back (a file, a connection, a lock):
 *
 *   acquire   an Effect that gets the resource
 *   use       a function from the resource to the work to do with it
 *   release   a function from the resource to the cleanup
 *
 * release ALWAYS runs once acquire has succeeded, whether use succeeded,
 * failed, or was interrupted.
 *
 * Goal: open the file, run `read` on it, and always close it.
 */
import { Effect } from "effect"

interface File {
  readonly readLine: () => string
  readonly close: () => Effect.Effect<void>
}

const log: Array<string> = []
const openFile: Effect.Effect<File> = Effect.sync(() => {
  log.push("open")
  return { readLine: () => "first line", close: () => Effect.sync(() => { log.push("close") }) }
})

const readWith = (read: (file: File) => Effect.Effect<string, string>): Effect.Effect<string, string> =>
  Effect.acquireUseRelease(openFile, read, (file) => file.close())

check("success", await Effect.runPromise(readWith((file) => Effect.succeed(file.readLine()))), "first line")
check("log after success", log, ["open", "close"])
log.length = 0
const exit = await Effect.runPromiseExit(readWith(() => Effect.fail("disk error")))
check("the failure is preserved", String(exit).includes("disk error"), true)
check("the file was still closed", log, ["open", "close"])
