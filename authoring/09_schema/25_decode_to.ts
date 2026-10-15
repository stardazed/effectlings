//#title From one shape to another
//#kind complete
//#teaches Schema.decodeTo
//#hint decodeTo takes the target schema and a transformation whose decode and encode convert between the two shapes.
//#hint Schema.decodeTo(Schema.Struct({ age: Schema.Number }), SchemaTransformation.transform({ decode: ..., encode: ... }))
/**
 * Schema.decode keeps the same kind of schema. Schema.decodeTo moves from
 * one schema to a DIFFERENT one:
 *
 *   source.pipe(Schema.decodeTo(target, SchemaTransformation.transform({ decode, encode })))
 *
 * decode turns the source's value into the target's; encode goes back.
 *
 * Goal: the outside sends { birthYear }, your program wants { age },
 * computed against the year 2026.
 */
import { Schema, SchemaTransformation } from "effect"

const currentYear = 2026

//#solution
const Person: Schema.Codec<{ readonly age: number }, { readonly birthYear: number }> =
  Schema.Struct({ birthYear: Schema.Number }).pipe(
    Schema.decodeTo(
      Schema.Struct({ age: Schema.Number }),
      SchemaTransformation.transform({
        decode: (input: { readonly birthYear: number }) => ({ age: currentYear - input.birthYear }),
        encode: (value: { readonly age: number }) => ({ birthYear: currentYear - value.age })
      })
    )
  )
//#exercise
const Person: Schema.Codec<{ readonly age: number }, { readonly birthYear: number }> = todo()
//#end

check("decode", Schema.decodeUnknownSync(Person)({ birthYear: 2000 }), { age: 26 })
check("encode", Schema.encodeSync(Person)({ age: 26 }), { birthYear: 2000 })
