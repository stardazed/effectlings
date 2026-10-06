//#title Capstone: a receipt
//#kind complete
//#deepens Effect.fn, Effect.forEach, Effect.all, Effect.fail, Effect.succeed, yield*
//#hint Look up every price with forEach, then add them up with plain code.
//#hint Effect.all([Effect.forEach(skus, lookupPrice), taxRate]) gets the prices and the rate together.
/**
 * Put the chapter together.
 *
 * Goal: write `receipt(skus)` that looks up every sku's price, adds them
 * into a subtotal, applies the tax rate, and produces
 * { subtotal, tax, total }. An unknown sku must fail with the message
 * produced by lookupPrice.
 */
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

interface Receipt {
  readonly subtotal: number
  readonly tax: number
  readonly total: number
}

const prices: Record<string, number> = { apple: 2, pear: 3 }
const lookupPrice = (sku: string): Effect.Effect<number, string> =>
  sku in prices ? Effect.succeed(prices[sku]) : Effect.fail(`unknown sku: ${sku}`)
const taxRate = Effect.succeed(0.1)

//#solution
const receipt = Effect.fn("receipt")(function*(skus: ReadonlyArray<string>) {
  const [unitPrices, rate] = yield* Effect.all([Effect.forEach(skus, lookupPrice), taxRate])
  const subtotal = unitPrices.reduce((sum, p) => sum + p, 0)
  const tax = subtotal * rate
  return { subtotal, tax, total: subtotal + tax } satisfies Receipt
})
//#exercise
const receipt: (skus: ReadonlyArray<string>) => Effect.Effect<Receipt, string> = todo()
//#end

check("receipt", await Effect.runPromise(receipt(["apple", "pear"])), { subtotal: 5, tax: 0.5, total: 5.5 })
check("empty", await Effect.runPromise(receipt([])), { subtotal: 0, tax: 0, total: 0 })
check("unknown sku", await rejection(Effect.runPromise(receipt(["apple", "kiwi"]))), "unknown sku: kiwi")
