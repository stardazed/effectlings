/**
 * Effect.zip(a, b) runs a, then b, and produces both results as a tuple
 * [resultOfA, resultOfB].
 *
 * Goal: produce the pair ["ada", 36].
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const name = Effect.succeed("ada")
const age = Effect.succeed(36)

const person: Effect.Effect<readonly [string, number]> = todo()

check("person", Effect.runSync(person), ["ada", 36] as const)
