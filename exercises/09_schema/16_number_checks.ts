/**
 *   Schema.isInt()                              no fractional part
 *   Schema.isBetween({ minimum, maximum })      inside the range, ends included
 *
 * Goal: an age is a whole number from 0 to 130.
 */
// I AM NOT DONE
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Age: Schema.Codec<number> = todo()

const valid = (input: unknown): boolean => thrown(() => Schema.decodeUnknownSync(Age)(input)) === undefined

check("ok", valid(36), true)
check("the ends are included", [valid(0), valid(130)], [true, true])
check("fraction", valid(3.5), false)
check("negative", valid(-1), false)
check("too old", valid(200), false)
