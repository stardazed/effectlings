//#title Your own error message
//#kind complete
//#teaches Schema.isGreaterThan
//#hint Most checks take an options object as the last argument. message is one of its fields.
//#hint Schema.isGreaterThan(0, { message: "must be positive" })
/**
 * When a rule fails, the error says which rule. You can replace the text
 * with `message`:
 *
 *   Schema.isGreaterThan(0, { message: "must be positive" })
 *
 * Goal: a quantity is a number greater than 0, reported as "must be positive".
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const Quantity = Schema.Number.check(Schema.isGreaterThan(0, { message: "must be positive" }))
//#exercise
const Quantity: Schema.Codec<number> = todo()
//#end

const error = thrown(() => Schema.decodeUnknownSync(Quantity)(-1))
check("valid", Schema.decodeUnknownSync(Quantity)(3), 3)
check("message", error instanceof Error ? error.message : "no error", "must be positive")
