/**
 * So far decoding only checked data. A schema can also CONVERT it.
 * Schema.NumberFromString accepts a string and produces a number:
 *
 *   decode    "12"  ->  12
 *   encode    12    ->  "12"
 *
 * A schema therefore has two sides:
 *
 *   Encoded   what the outside world holds   (here: string)
 *   Type      what your program works with   (here: number)
 *
 * Schema.encodeSync(schema) goes from Type back to Encoded.
 *
 * Goal: a parser from text to number and a formatter from number to text.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const parseQty = Schema.decodeUnknownSync(Schema.NumberFromString)
const formatQty = Schema.encodeSync(Schema.NumberFromString)

check("decode", parseQty("12"), 12)
check("decode a decimal", parseQty("2.5"), 2.5)
check("encode", formatQty(12), "12")
check("a number is not the encoded form", thrown(() => parseQty(12)) !== undefined, true)
