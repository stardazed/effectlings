/**
 *   Schema.isInt()                              no fractional part
 *   Schema.isBetween({ minimum, maximum })      inside the range, ends included
 *
 * Goal: an age is a whole number from 0 to 130.
 */
import { Schema } from "effect"

const Age: Schema.Codec<number> = Schema.Number.check(Schema.isInt(), Schema.isBetween({ minimum: 0, maximum: 130 }))

const valid = (input: unknown): boolean => thrown(() => Schema.decodeUnknownSync(Age)(input)) === undefined

check("ok", valid(36), true)
check("the ends are included", [valid(0), valid(130)], [true, true])
check("fraction", valid(3.5), false)
check("negative", valid(-1), false)
check("too old", valid(200), false)
