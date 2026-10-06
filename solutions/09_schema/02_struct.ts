/**
 * Schema.Struct describes an object, field by field:
 *
 *   const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })
 *
 * From the schema you can get the TypeScript type, so you write the shape once:
 *
 *   type Person = typeof Person.Type
 *
 * Decoding checks every field, and fields the schema does not mention are
 * dropped from the result.
 *
 * The type of a schema is Schema.Codec<Type, Encoded>. You will see it in the
 * exercises that follow, where it states what you have to produce.
 *
 * Goal: define Person.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })

const asCodec: Schema.Codec<typeof Person.Type> = Person
const decode = Schema.decodeUnknownSync(asCodec)

check("valid", decode({ name: "Ada", age: 36 }), { name: "Ada", age: 36 })
check("extra keys are dropped", decode({ name: "Ada", age: 36, admin: true }), { name: "Ada", age: 36 })
check("a wrong field type is rejected", thrown(() => decode({ name: "Ada", age: "36" })) !== undefined, true)
check("a missing field is rejected", thrown(() => decode({ name: "Ada" })) !== undefined, true)
