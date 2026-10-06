//#title Asking an Option what it holds
//#kind complete
//#teaches Option.isSome, Option.isNone
//#hint isSome narrows the type, so inside the true branch you can read .value.
//#hint Option.isSome(o) ? `value ${o.value}` : "nothing", and Option.isNone(o) for the second function.
/**
 * Option.isSome(o) and Option.isNone(o) answer "is there a value?".
 * isSome also narrows the type: in the branch where it is true, TypeScript
 * lets you read `o.value`.
 *
 * Goal: describe an Option, and test it for emptiness.
 */
import { Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const describe = (o: Option.Option<number>): string => (Option.isSome(o) ? `value ${o.value}` : "nothing")
const isMissing = (o: Option.Option<number>): boolean => Option.isNone(o)
//#exercise
const describe = (o: Option.Option<number>): string => todo()
const isMissing = (o: Option.Option<number>): boolean => todo()
//#end

check("describe some", describe(Option.some(3)), "value 3")
check("describe none", describe(Option.none()), "nothing")
check("missing", isMissing(Option.none()), true)
check("not missing", isMissing(Option.some(1)), false)
