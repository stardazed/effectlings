//#title One of several shapes
//#kind complete
//#teaches Schema.Union
//#hint Union takes an array of schemas. The input must fit at least one.
//#hint Schema.Union([..., ...])
/**
 * Schema.Union([a, b, ...]) accepts a value that fits any one member.
 *
 * Goal: an identifier may be a string or a number.
 */
import { Schema } from "effect"

//#solution
const Id: Schema.Codec<string | number> = Schema.Union([Schema.String, Schema.Number])
//#exercise
const Id: Schema.Codec<string | number> = todo()
//#end

const decode = Schema.decodeUnknownSync(Id)

check("a string", decode("a1"), "a1")
check("a number", decode(7), 7)
check("neither", thrown(() => decode(true)) !== undefined, true)
