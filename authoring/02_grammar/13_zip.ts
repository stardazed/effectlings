//#title Pairing results with zip
//#kind complete
//#teaches Effect.zip
//#hint zip runs both programs, one after the other, and gives you a pair.
//#hint Effect.zip(name, age)
/**
 * Effect.zip(a, b) runs a, then b, and produces both results as a tuple
 * [resultOfA, resultOfB].
 *
 * Goal: produce the pair ["ada", 36].
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const name = Effect.succeed("ada")
const age = Effect.succeed(36)

//#solution
const person: Effect.Effect<readonly [string, number]> = Effect.zip(name, age)
//#exercise
const person: Effect.Effect<readonly [string, number]> = todo()
//#end

check("person", Effect.runSync(person), ["ada", 36] as const)
