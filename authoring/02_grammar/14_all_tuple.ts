//#title Running a list of programs with all
//#kind complete
//#teaches Effect.all
//#hint Effect.all accepts an array of effects.
//#hint Effect.all([name, age, admin])
/**
 * Effect.all runs several programs in order and collects their results.
 * Given an array, it produces a tuple that keeps each position's type.
 *
 *   Effect.all([a, b, c])   ->   Effect<[A, B, C]>
 *
 * Goal: gather the three values.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const name = Effect.succeed("ada")
const age = Effect.succeed(36)
const admin = Effect.succeed(true)

//#solution
const all: Effect.Effect<[string, number, boolean]> = Effect.all([name, age, admin])
//#exercise
const all: Effect.Effect<[string, number, boolean]> = todo()
//#end

check("all", Effect.runSync(all), ["ada", 36, true])
