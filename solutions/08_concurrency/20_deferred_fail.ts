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

const program: Effect.Effect<string, string> = Effect.gen(function*() {
  const signal = yield* Deferred.make<string, string>()
  yield* Deferred.fail(signal, "cancelled")
  return yield* Deferred.await(signal)
})

check("the awaiter fails", await rejection(Effect.runPromise(program)), "cancelled")
