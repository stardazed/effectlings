/**
 * Effect fibers are structured: a fiber started with forkChild is tied to
 * its parent. When the parent finishes, its children are interrupted.
 * Nothing is left running by accident.
 *
 * Predict the log.
 */
import { Effect } from "effect"

const log: Array<string> = []

const child = Effect.gen(function*() {
  log.push("child started")
  return yield* Effect.never
}).pipe(Effect.onInterrupt(() => Effect.sync(() => { log.push("child interrupted") })))

const parent = Effect.gen(function*() {
  yield* Effect.forkChild(child)
  yield* Effect.yieldNow
  log.push("parent done")
})

await Effect.runPromise(parent)

const expected: Array<string> = ["child started", "parent done", "child interrupted"]

check("log", log, expected)
