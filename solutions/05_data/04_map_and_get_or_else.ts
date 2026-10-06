/**
 * Option works like Effect:
 *
 *   option.pipe(Option.map(f))              change the value inside, if there is one
 *   option.pipe(Option.getOrElse(() => d))  leave the Option, using d when it is empty
 *
 * Goal: double a price that may be missing, and read a price with a default of 0.
 */
import { Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const doubled = (price: Option.Option<number>): Option.Option<number> => price.pipe(Option.map((p) => p * 2))
const orZero = (price: Option.Option<number>): number => price.pipe(Option.getOrElse(() => 0))

check("doubled some", doubled(Option.some(4)), Option.some(8))
check("doubled none", doubled(Option.none()), Option.none())
check("orZero some", orZero(Option.some(4)), 4)
check("orZero none", orZero(Option.none()), 0)
