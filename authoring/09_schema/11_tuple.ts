//#title Tuples
//#kind complete
//#teaches Schema.Tuple
//#hint Schema.Tuple takes an array of schemas, one per position.
//#hint Schema.Tuple([Schema.Number, Schema.Number])
/**
 * Schema.Tuple([a, b, ...]) describes an array with a fixed length where
 * each position has its own schema.
 *
 * Goal: a point is a pair of numbers.
 */
import { Schema } from "effect"

//#solution
const Point: Schema.Codec<readonly [number, number]> = Schema.Tuple([Schema.Number, Schema.Number])
//#exercise
const Point: Schema.Codec<readonly [number, number]> = todo()
//#end

const decode = Schema.decodeUnknownSync(Point)

check("a pair", decode([1, 2]), [1, 2])
check("too short", thrown(() => decode([1])) !== undefined, true)
check("too long", thrown(() => decode([1, 2, 3])) !== undefined, true)
check("wrong type", thrown(() => decode([1, "2"])) !== undefined, true)
