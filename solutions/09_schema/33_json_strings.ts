/**
 * Schema.fromJsonString(schema) decodes a JSON string: it parses the text
 * and then decodes the result with `schema`. Encoding does the reverse and
 * gives back JSON text. Both parse errors and shape errors come out as
 * SchemaErrors.
 *
 * Goal: a schema from JSON text to a Person.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })

const PersonFromJson = Schema.fromJsonString(Person)

check("decode", Schema.decodeUnknownSync(PersonFromJson)('{"name":"Ada","age":36}'), { name: "Ada", age: 36 })
check("encode", Schema.encodeSync(PersonFromJson)({ name: "Ada", age: 36 }), '{"name":"Ada","age":36}')
check("broken JSON", thrown(() => Schema.decodeUnknownSync(PersonFromJson)("{")) !== undefined, true)
check("wrong shape", thrown(() => Schema.decodeUnknownSync(PersonFromJson)('{"name":1}')) !== undefined, true)
