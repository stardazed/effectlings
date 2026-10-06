/**
 * To invent a conversion, describe both directions:
 *
 *   SchemaTransformation.transform({ decode, encode })
 *
 * and attach it with Schema.decode, which keeps the same kind of value on
 * both sides and only changes the number:
 *
 *   Schema.Finite.pipe(Schema.decode(transformation))
 *
 * (Schema.Finite is Schema.Number without NaN and infinities.)
 *
 * Goal: the outside world sends meters, your program works in kilometers.
 */
// I AM NOT DONE
import { Schema, SchemaTransformation } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Kilometers: Schema.Codec<number> = todo()

check("decode", Schema.decodeUnknownSync(Kilometers)(2500), 2.5)
check("encode", Schema.encodeSync(Kilometers)(2.5), 2500)
