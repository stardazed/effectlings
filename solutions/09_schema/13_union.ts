/**
 * Schema.Union([a, b, ...]) accepts a value that fits any one member.
 *
 * Goal: an identifier may be a string or a number.
 */
import { Schema } from "effect"

const Id: Schema.Codec<string | number> = Schema.Union([Schema.String, Schema.Number])

const decode = Schema.decodeUnknownSync(Id)

check("a string", decode("a1"), "a1")
check("a number", decode(7), 7)
check("neither", thrown(() => decode(true)) !== undefined, true)
