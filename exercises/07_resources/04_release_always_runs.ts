/**
 * Predict the log. The use phase logs "use" and then fails.
 * Write your prediction in `expected`, then confirm by running.
 */
// I AM NOT DONE
import { Effect } from "effect"

const log: Array<string> = []

const program = Effect.acquireUseRelease(
  Effect.sync(() => { log.push("open") }),
  () =>
    Effect.gen(function*() {
      yield* Effect.sync(() => { log.push("use") })
      return yield* Effect.fail("boom")
    }),
  () => Effect.sync(() => { log.push("close") })
)

await Effect.runPromiseExit(program)

const expected: Array<string> = todo()

check("log", log, expected)
