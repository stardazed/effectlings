/**
 * Effect.all runs several programs in order and collects their results.
 * Given an array, it produces a tuple that keeps each position's type.
 *
 *   Effect.all([a, b, c])   ->   Effect<[A, B, C]>
 *
 * Goal: gather the three values.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const name = Effect.succeed("ada")
const age = Effect.succeed(36)
const admin = Effect.succeed(true)

const all: Effect.Effect<[string, number, boolean]> = todo()

check("all", Effect.runSync(all), ["ada", 36, true])
