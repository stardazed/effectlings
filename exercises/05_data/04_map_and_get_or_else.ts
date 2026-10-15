/**
 * Option works like Effect:
 *
 *   option.pipe(Option.map(f))              change the value inside, if there is one
 *   option.pipe(Option.getOrElse(() => d))  leave the Option, using d when it is empty
 *
 * Goal: double a price that may be missing, and read a price with a default of 0.
 */
// I AM NOT DONE
import { Option } from "effect"

const doubled = (price: Option.Option<number>): Option.Option<number> => todo()
const orZero = (price: Option.Option<number>): number => todo()

check("doubled some", doubled(Option.some(4)), Option.some(8))
check("doubled none", doubled(Option.none()), Option.none())
check("orZero some", orZero(Option.some(4)), 4)
check("orZero none", orZero(Option.none()), 0)
