//#title A rule of your own
//#kind complete
//#teaches Schema.makeFilter
//#hint makeFilter takes a function from the value to: undefined when it is fine, or a message when it is not.
//#hint Schema.makeFilter((n: number) => (n % 2 === 0 ? undefined : "must be even"))
/**
 * Schema.makeFilter(f) builds a rule from your own function. f receives the
 * value and returns:
 *
 *   undefined        the value is fine
 *   "some message"   the value is rejected, with that message
 *
 * Goal: an even number.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const Even = Schema.Number.check(Schema.makeFilter((n: number) => (n % 2 === 0 ? undefined : "must be even")))
//#exercise
const Even: Schema.Codec<number> = todo()
//#end

const error = thrown(() => Schema.decodeUnknownSync(Even)(3))
check("even", Schema.decodeUnknownSync(Even)(4), 4)
check("odd", error instanceof Error ? error.message : "no error", "must be even")
