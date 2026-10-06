/**
 * To write a reusable function whose body is a generator, use Effect.fn:
 *
 *   const add = Effect.fn("add")(function*(a: number, b: number) {
 *     const extra = yield* someEffect
 *     return a + b + extra
 *   })
 *
 * The string is a name. It shows up in stack traces and tracing later.
 * Prefer this over a function that returns Effect.gen(...).
 *
 * Goal: write priceWithTax.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const taxRate = Effect.succeed(0.5)

const priceWithTax = Effect.fn("priceWithTax")(function*(price: number) {
  const rate = yield* taxRate
  return price + price * rate
})

check("priceWithTax", Effect.runSync(priceWithTax(10)), 15)
