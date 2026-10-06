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
// I AM NOT DONE
import { Deferred, Effect, Fiber } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const program: Effect.Effect<string> = todo()

check("the waiter received", await Effect.runPromise(program), "go")
