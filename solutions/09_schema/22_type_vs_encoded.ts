/**
 * Every schema knows both sides:
 *
 *   typeof schema.Type       the decoded value your program uses
 *   typeof schema.Encoded    the raw form on the outside
 *
 * For a plain Struct of primitives they are the same. They differ as soon
 * as a field converts. Schema.DateFromString turns an ISO date string into
 * a Date.
 *
 * Goal: fix the two aliases.
 */
import { Schema } from "effect"
import { check } from "../../src/check.ts"
import type { Equal, Expect } from "../../src/types.ts"

const Order = Schema.Struct({
  qty: Schema.NumberFromString,
  at: Schema.DateFromString
})

type OrderType = { readonly qty: number; readonly at: Date }
type OrderEncoded = { readonly qty: string; readonly at: string }

export type Tests = [
  Expect<Equal<typeof Order.Type, OrderType>>,
  Expect<Equal<typeof Order.Encoded, OrderEncoded>>
]

const decoded = Schema.decodeUnknownSync(Order)({ qty: "3", at: "1970-01-01T00:00:00.000Z" })
check("decoded qty", decoded.qty, 3)
check("decoded at", decoded.at.getTime(), 0)
