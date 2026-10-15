/**
 * Schema.is(schema) gives a type guard: (input: unknown) => input is Type.
 * It only answers yes or no. It does not change the value, and it does not
 * drop extra keys.
 *
 * Goal: describe an unknown value.
 */
// I AM NOT DONE
import { Schema } from "effect"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })

const describe = (input: unknown): string => todo()

check("a person", describe({ name: "Ada", age: 36 }), "person Ada")
check("not a person", describe("Ada"), "not a person")
