/**
 * Predict the log. The parent does not wait for the child until it joins.
 */
import { Effect, Fiber } from "effect"

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

const expected: Array<string> = ["forked", "child done", "joined"]

check("log", log, expected)
