/**
 * Encoding is decoding run backwards. Predict what encoding this value gives.
 */
// I AM NOT DONE
import { Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Order = Schema.Struct({
  qty: Schema.NumberFromString,
  at: Schema.DateFromString
})

const encoded = Schema.encodeSync(Order)({ qty: 3, at: new Date(0) })

const expected: { qty: string; at: string } = todo()

check("encoded", { ...encoded }, expected)
check("round trip", Schema.decodeUnknownSync(Order)(encoded).qty, 3)
