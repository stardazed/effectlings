/**
 * A scope releases its resources last-in, first-out. That is the right
 * order: a resource acquired later may depend on one acquired earlier.
 *
 * Predict the log.
 */
// I AM NOT DONE
import { Effect } from "effect"

const log: Array<string> = []

const resource = (name: string) =>
  Effect.acquireRelease(
    Effect.sync(() => { log.push(`open ${name}`) }),
    () => Effect.sync(() => { log.push(`close ${name}`) })
  )

await Effect.runPromise(
  Effect.scoped(
    Effect.gen(function*() {
      yield* resource("a")
      yield* resource("b")
      log.push("working")
    })
  )
)

const expected: Array<string> = todo()

check("log", log, expected)
