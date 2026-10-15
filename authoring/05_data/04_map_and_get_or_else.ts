//#title Transforming an Option
//#kind complete
//#teaches Option.map, Option.getOrElse
//#hint Options have .pipe just like Effects. map changes the value inside, if there is one.
//#hint price.pipe(Option.map((p) => p * 2)) and o.pipe(Option.getOrElse(() => 0))
/**
 * Option works like Effect:
 *
 *   option.pipe(Option.map(f))              change the value inside, if there is one
 *   option.pipe(Option.getOrElse(() => d))  leave the Option, using d when it is empty
 *
 * Goal: double a price that may be missing, and read a price with a default of 0.
 */
import { Option } from "effect"

//#solution
const doubled = (price: Option.Option<number>): Option.Option<number> => price.pipe(Option.map((p) => p * 2))
const orZero = (price: Option.Option<number>): number => price.pipe(Option.getOrElse(() => 0))
//#exercise
const doubled = (price: Option.Option<number>): Option.Option<number> => todo()
const orZero = (price: Option.Option<number>): number => todo()
//#end

check("doubled some", doubled(Option.some(4)), Option.some(8))
check("doubled none", doubled(Option.none()), Option.none())
check("orZero some", orZero(Option.some(4)), 4)
check("orZero none", orZero(Option.none()), 0)
