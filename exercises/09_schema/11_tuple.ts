/**
 * Schema.Tuple([a, b, ...]) describes an array with a fixed length where
 * each position has its own schema.
 *
 * Goal: a point is a pair of numbers.
 */
// I AM NOT DONE
import { Schema } from "effect"

const Point: Schema.Codec<readonly [number, number]> = todo()

const decode = Schema.decodeUnknownSync(Point)

check("a pair", decode([1, 2]), [1, 2])
check("too short", thrown(() => decode([1])) !== undefined, true)
check("too long", thrown(() => decode([1, 2, 3])) !== undefined, true)
check("wrong type", thrown(() => decode([1, "2"])) !== undefined, true)
