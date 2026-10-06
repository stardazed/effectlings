/**
 * TypeScript types disappear when the program runs. Data that comes from
 * outside (a file, a request, JSON) arrives as `unknown`, and nothing checks
 * that it has the shape you hoped for.
 *
 * A Schema is a runtime description of a type. Decoding checks unknown data
 * against it:
 *
 *   Schema.String, Schema.Number               schemas for primitives
 *   Schema.decodeUnknownSync(schema)           a function (input: unknown) => value
 *                                              that throws if the input does not fit
 *
 * Goal: build a string parser and a number parser.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const parseName = Schema.decodeUnknownSync(Schema.String)
const parseCount = Schema.decodeUnknownSync(Schema.Number)

check("a string", parseName("ada"), "ada")
check("a number", parseCount(3), 3)
check("a number is not a string", thrown(() => parseName(3)) !== undefined, true)
check("a string is not a number", thrown(() => parseCount("3")) !== undefined, true)
