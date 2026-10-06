//#title Finalizers see how the scope ended
//#kind complete
//#deepens Effect.addFinalizer, Effect.scoped
//#hint The finalizer receives the Exit of the scoped block. Its _tag is "Success" or "Failure".
//#hint The first program succeeds and the second fails.
/**
 * A finalizer gets the Exit of the scope. It can tell whether the work
 * succeeded or failed, for example to roll back a transaction on failure.
 *
 * Predict the two tags that are logged.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []

const withFinalizer = <A, E>(work: Effect.Effect<A, E>) =>
  Effect.scoped(
    Effect.gen(function*() {
      yield* Effect.addFinalizer((exit) => Effect.sync(() => { log.push(exit._tag) }))
      return yield* work
    })
  )

await Effect.runPromiseExit(withFinalizer(Effect.succeed(1)))
await Effect.runPromiseExit(withFinalizer(Effect.fail("boom")))

//#solution
const expected: Array<string> = ["Success", "Failure"]
//#exercise
const expected: Array<string> = todo()
//#end

check("log", log, expected)
