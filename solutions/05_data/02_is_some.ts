/**
 * Option.isSome(o) and Option.isNone(o) answer "is there a value?".
 * isSome also narrows the type: in the branch where it is true, TypeScript
 * lets you read `o.value`.
 *
 * Goal: describe an Option, and test it for emptiness.
 */
import { Option } from "effect"

const describe = (o: Option.Option<number>): string => (Option.isSome(o) ? `value ${o.value}` : "nothing")
const isMissing = (o: Option.Option<number>): boolean => Option.isNone(o)

check("describe some", describe(Option.some(3)), "value 3")
check("describe none", describe(Option.none()), "nothing")
check("missing", isMissing(Option.none()), true)
check("not missing", isMissing(Option.some(1)), false)
