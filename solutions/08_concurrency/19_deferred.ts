/**
 * A Deferred is a box that can be filled once. Fibers that await it wait
 * until somebody fills it.
 *
 *   Deferred.make<A>()                 an empty Deferred
 *   Deferred.succeed(deferred, value)  fill it
 *   Deferred.await(deferred)           wait for the value
 *
 * It is the building block for "tell that fiber when something is ready".
 *
 * Goal: a waiter fiber awaits the signal; after 5ms the main fiber sends
 * "go"; return what the waiter received.
 */
import { Deferred, Effect, Fiber } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const program = Effect.gen(function*() {
  const signal = yield* Deferred.make<string>()
  const waiter = yield* Effect.forkChild(Deferred.await(signal))
  yield* Effect.sleep("5 millis")
  yield* Deferred.succeed(signal, "go")
  return yield* Fiber.join(waiter)
})

check("the waiter received", await Effect.runPromise(program), "go")
