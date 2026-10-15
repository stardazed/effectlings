//#title Schemas for JSON text
//#kind complete
//#teaches Schema.fromJsonString
//#hint Give fromJsonString the schema of the value INSIDE the JSON.
//#hint Schema.fromJsonString(Person)
/**
 * Schema.fromJsonString(schema) decodes a JSON string: it parses the text
 * and then decodes the result with `schema`. Encoding does the reverse and
 * gives back JSON text. Both parse errors and shape errors come out as
 * SchemaErrors.
 *
 * Goal: a schema from JSON text to a Person.
 */
import { Schema } from "effect"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })

//#solution
const PersonFromJson: Schema.Codec<{ readonly name: string; readonly age: number }, string> = Schema.fromJsonString(Person)
//#exercise
const PersonFromJson: Schema.Codec<{ readonly name: string; readonly age: number }, string> = todo()
//#end

check("decode", Schema.decodeUnknownSync(PersonFromJson)('{"name":"Ada","age":36}'), { name: "Ada", age: 36 })
check("encode", Schema.encodeSync(PersonFromJson)({ name: "Ada", age: 36 }), '{"name":"Ada","age":36}')
check("broken JSON", thrown(() => Schema.decodeUnknownSync(PersonFromJson)("{")) !== undefined, true)
check("wrong shape", thrown(() => Schema.decodeUnknownSync(PersonFromJson)('{"name":1}')) !== undefined, true)
