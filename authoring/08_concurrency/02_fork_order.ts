//#title Who goes first?
//#kind complete
//#deepens Effect.forkChild, Fiber.join, Effect.sleep, Effect.tap
//#hint forkChild returns immediately. The child has to sleep before it logs.
//#hint forked, then the child finishes, then joined.
/**
 * Predict the log. The parent does not wait for the child until it joins.
 */
import { Effect, Fiber } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []

const program = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(
    Effect.sleep("5 millis").pipe(Effect.tap(() => Effect.sync(() => { log.push("child done") })))
  )
  log.push("forked")
  yield* Fiber.join(fiber)
  log.push("joined")
})

await Effect.runPromise(program)

//#solution
const expected: Array<string> = ["forked", "child done", "joined"]
//#exercise
const expected: Array<string> = todo()
//#end

check("log", log, expected)
