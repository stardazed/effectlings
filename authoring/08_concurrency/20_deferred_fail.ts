//#title A signal that failed
//#kind complete
//#teaches Deferred.fail
//#hint Deferred.make takes a second type argument for the error. fail completes it with a failure.
//#hint const d = yield* Deferred.make<string, string>(); yield* Deferred.fail(d, "cancelled"); return yield* Deferred.await(d)
/**
 * A Deferred can also be completed with a failure. Everyone who awaits it
 * then fails with that error.
 *
 *   Deferred.make<A, E>()
 *   Deferred.fail(deferred, error)
 *
 * Goal: make a Deferred, fail it with "cancelled", and await it.
 */
import { Deferred, Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const program: Effect.Effect<string, string> = Effect.gen(function*() {
  const signal = yield* Deferred.make<string, string>()
  yield* Deferred.fail(signal, "cancelled")
  return yield* Deferred.await(signal)
})
//#exercise
const program: Effect.Effect<string, string> = todo()
//#end

check("the awaiter fails", await rejection(Effect.runPromise(program)), "cancelled")
