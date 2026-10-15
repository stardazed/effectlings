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

const label = (price: Option.Option<number>): string =>
  price.pipe(Option.match({ onNone: () => "no price", onSome: (p) => `$${p}` }))

check("some", label(Option.some(5)), "$5")
check("none", label(Option.none()), "no price")
