/**
 * Ref updates are atomic, so any number of fibers can update the same Ref
 * and no increment is lost.
 *
 * Goal: countTo(n) starts n fibers that each add one to a shared counter
 * and returns the final count.
 */
// I AM NOT DONE
import { Effect, Ref } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const countTo = (n: number): Effect.Effect<number> => todo()

check("fifty increments", await Effect.runPromise(countTo(50)), 50)
check("none", await Effect.runPromise(countTo(0)), 0)
