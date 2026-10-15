//#title Children end with their parent
//#kind complete
//#deepens Effect.forkChild, Effect.onInterrupt, Effect.yieldNow
//#hint A child started with forkChild cannot outlive the fiber that forked it.
//#hint child started, parent done, then the child is interrupted as the parent finishes.
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

//#solution
const expected: Array<string> = ["child started", "parent done", "child interrupted"]
//#exercise
const expected: Array<string> = todo()
//#end

check("log", log, expected)
