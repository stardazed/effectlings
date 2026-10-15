//#title A type guard from a schema
//#kind complete
//#teaches Schema.is
//#hint Schema.is(Person) is a function you can call in an if. Inside the branch TypeScript knows the shape.
//#hint Schema.is(Person)(input) ? `person ${input.name}` : "not a person"
/**
 * Schema.is(schema) gives a type guard: (input: unknown) => input is Type.
 * It only answers yes or no. It does not change the value, and it does not
 * drop extra keys.
 *
 * Goal: describe an unknown value.
 */
import { Schema } from "effect"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })

//#solution
const describe = (input: unknown): string => (Schema.is(Person)(input) ? `person ${input.name}` : "not a person")
//#exercise
const describe = (input: unknown): string => todo()
//#end

check("a person", describe({ name: "Ada", age: 36 }), "person Ada")
check("not a person", describe("Ada"), "not a person")
