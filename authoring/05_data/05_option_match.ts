//#title Handling both cases with match
//#kind complete
//#teaches Option.match
//#hint match takes an object with onNone and onSome.
//#hint price.pipe(Option.match({ onNone: () => ..., onSome: (p) => ... }))
/**
 * Option.match handles both cases and produces a plain value:
 *
 *   option.pipe(Option.match({
 *     onNone: () => ...,
 *     onSome: (value) => ...
 *   }))
 *
 * Goal: label a price as text.
 */
import { Option } from "effect"

//#solution
const label = (price: Option.Option<number>): string =>
  price.pipe(Option.match({ onNone: () => "no price", onSome: (p) => `$${p}` }))
//#exercise
const label = (price: Option.Option<number>): string => todo()
//#end

check("some", label(Option.some(5)), "$5")
check("none", label(Option.none()), "no price")
