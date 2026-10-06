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
// I AM NOT DONE
import { Schema, SchemaTransformation } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const currentYear = 2026

const Person: Schema.Codec<{ readonly age: number }, { readonly birthYear: number }> = todo()

check("decode", Schema.decodeUnknownSync(Person)({ birthYear: 2000 }), { age: 26 })
check("encode", Schema.encodeSync(Person)({ age: 26 }), { birthYear: 2000 })
