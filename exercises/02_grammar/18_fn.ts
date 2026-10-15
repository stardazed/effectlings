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
// I AM NOT DONE
import { Effect } from "effect"

const taxRate = Effect.succeed(0.5)

const priceWithTax: (price: number) => Effect.Effect<number> = todo()

check("priceWithTax", Effect.runSync(priceWithTax(10)), 15)
