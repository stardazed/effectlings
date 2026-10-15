//#title all with named results
//#kind complete
//#deepens Effect.all
//#hint Effect.all also accepts an object whose values are effects.
//#hint Effect.all({ name, age, admin })
/**
 * Effect.all also takes an object. The result has the same keys, holding
 * each program's result. Named fields are harder to mix up than tuple
 * positions.
 *
 * Goal: gather the three values into one object.
 */
import { Effect } from "effect"

const name = Effect.succeed("ada")
const age = Effect.succeed(36)
const admin = Effect.succeed(true)

//#solution
const person: Effect.Effect<{ name: string; age: number; admin: boolean }> = Effect.all({ name, age, admin })
//#exercise
const person: Effect.Effect<{ name: string; age: number; admin: boolean }> = todo()
//#end

check("person", Effect.runSync(person), { name: "ada", age: 36, admin: true })
