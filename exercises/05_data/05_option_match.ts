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
// I AM NOT DONE
import { Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const label = (price: Option.Option<number>): string => todo()

check("some", label(Option.some(5)), "$5")
check("none", label(Option.none()), "no price")
