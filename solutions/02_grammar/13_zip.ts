/**
 * Effect.zip(a, b) runs a, then b, and produces both results as a tuple
 * [resultOfA, resultOfB].
 *
 * Goal: produce the pair ["ada", 36].
 */
import { Effect } from "effect"

const name = Effect.succeed("ada")
const age = Effect.succeed(36)

const person: Effect.Effect<readonly [string, number]> = Effect.zip(name, age)

check("person", Effect.runSync(person), ["ada", 36] as const)
