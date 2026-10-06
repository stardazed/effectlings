//#title There and back again
//#kind complete
//#deepens Schema.encodeSync, Schema.NumberFromString, Schema.DateFromString
//#hint encodeSync turns each field back to its Encoded form. The number becomes a string, the Date an ISO string.
//#hint { qty: "3", at: "1970-01-01T00:00:00.000Z" }
/**
 * Encoding is decoding run backwards. Predict what encoding this value gives.
 */
import { Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Order = Schema.Struct({
  qty: Schema.NumberFromString,
  at: Schema.DateFromString
})

const encoded = Schema.encodeSync(Order)({ qty: 3, at: new Date(0) })

//#solution
const expected: { qty: string; at: string } = { qty: "3", at: "1970-01-01T00:00:00.000Z" }
//#exercise
const expected: { qty: string; at: string } = todo()
//#end

check("encoded", { ...encoded }, expected)
check("round trip", Schema.decodeUnknownSync(Order)(encoded).qty, 3)
