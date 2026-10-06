/**
 * Exceptions are awkward to handle. Schema has decoders for the data types
 * you already know:
 *
 *   Schema.decodeUnknownOption(schema)(input)   Option: none when invalid
 *
 * Goal: a parsePerson that returns an Option.
 */
import { Option, Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })

const parsePerson = (input: unknown): Option.Option<typeof Person.Type> => Schema.decodeUnknownOption(Person)(input)

check("valid", parsePerson({ name: "Ada", age: 36 }), Option.some({ name: "Ada", age: 36 }))
check("invalid", parsePerson({ name: "Ada" }), Option.none())
