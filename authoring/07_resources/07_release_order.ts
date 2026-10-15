//#title Released in reverse order
//#kind complete
//#deepens Effect.acquireRelease, Effect.scoped, Effect.gen
//#hint Resources are released in the opposite order they were acquired, like a stack.
//#hint open a, open b, working, then close b, close a.
/**
 * A scope releases its resources last-in, first-out. That is the right
 * order: a resource acquired later may depend on one acquired earlier.
 *
 * Predict the log.
 */
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

//#solution
const expected: Array<string> = ["open a", "open b", "working", "close b", "close a"]
//#exercise
const expected: Array<string> = todo()
//#end

check("log", log, expected)
