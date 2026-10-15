/**
 * Option.all combines several Options. If every one has a value you get
 * a some holding all the values. If any is empty, you get none.
 *
 *   Option.all([a, b])          some([valueA, valueB])
 *   Option.all({ a, b })        some({ a: valueA, b: valueB })
 *
 * It works like Effect.all, for Options.
 *
 * Goal: build a full name and a person record, only when both parts exist.
 */
// I AM NOT DONE
import { Option } from "effect"

const fullName = (first: Option.Option<string>, last: Option.Option<string>): Option.Option<string> => todo()
const person = (
  first: Option.Option<string>,
  last: Option.Option<string>
): Option.Option<{ first: string; last: string }> => todo()

check("full name", fullName(Option.some("Ada"), Option.some("Lovelace")), Option.some("Ada Lovelace"))
check("missing last", fullName(Option.some("Ada"), Option.none()), Option.none())
check("person", person(Option.some("Ada"), Option.some("Lovelace")), Option.some({ first: "Ada", last: "Lovelace" }))
check("person missing", person(Option.none(), Option.some("Lovelace")), Option.none())
