/**
 * Put the chapter together.
 *
 * Goal: write `receipt(skus)` that looks up every sku's price, adds them
 * into a subtotal, applies the tax rate, and produces
 * { subtotal, tax, total }. An unknown sku must fail with the message
 * produced by lookupPrice.
 */
// I AM NOT DONE
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

const receipt: (skus: ReadonlyArray<string>) => Effect.Effect<Receipt, string> = todo()

check("receipt", await Effect.runPromise(receipt(["apple", "pear"])), { subtotal: 5, tax: 0.5, total: 5.5 })
check("empty", await Effect.runPromise(receipt([])), { subtotal: 0, tax: 0, total: 0 })
check("unknown sku", await rejection(Effect.runPromise(receipt(["apple", "kiwi"]))), "unknown sku: kiwi")
