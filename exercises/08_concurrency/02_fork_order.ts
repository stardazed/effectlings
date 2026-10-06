/**
 * Predict the log. The parent does not wait for the child until it joins.
 */
// I AM NOT DONE
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

const expected: Array<string> = todo()

check("log", log, expected)
