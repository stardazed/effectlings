/**
 * Effect.all also takes an object. The result has the same keys, holding
 * each program's result. Named fields are harder to mix up than tuple
 * positions.
 *
 * Goal: gather the three values into one object.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const name = Effect.succeed("ada")
const age = Effect.succeed(36)
const admin = Effect.succeed(true)

const person = Effect.all({ name, age, admin })

check("person", Effect.runSync(person), { name: "ada", age: 36, admin: true })
