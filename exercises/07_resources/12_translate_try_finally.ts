/**
 * Plain TypeScript:
 *
 *   async function firstLine(path: string): Promise<string> {
 *     const file = await open(path)
 *     try {
 *       return await file.readLine()
 *     } finally {
 *       await file.close()
 *     }
 *   }
 *
 * open, readLine and close already return Effects. Write firstLine.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

interface File {
  readonly readLine: () => Effect.Effect<string, string>
  readonly close: () => Effect.Effect<void>
}

const log: Array<string> = []
const open = (path: string): Effect.Effect<File> =>
  Effect.sync(() => {
    log.push(`open ${path}`)
    return {
      readLine: () => (path === "bad" ? Effect.fail("unreadable") : Effect.succeed("hello")),
      close: () => Effect.sync(() => { log.push(`close ${path}`) })
    }
  })

const firstLine = (path: string): Effect.Effect<string, string> => todo()

check("good file", await Effect.runPromise(firstLine("a.txt")), "hello")
check("log", log, ["open a.txt", "close a.txt"])
log.length = 0
await Effect.runPromiseExit(firstLine("bad"))
check("closed even though reading failed", log, ["open bad", "close bad"])
