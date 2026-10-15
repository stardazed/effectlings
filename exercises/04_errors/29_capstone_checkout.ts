/**
 * Bring the chapter together.
 *
 * 1. placeOrder(sku, qty):
 *    - stockOf(sku) may fail with UnknownSku
 *    - if the stock is below qty, fail with OutOfStock
 *    - otherwise charge(unitPrice[sku] * qty), which may fail with PaymentDeclined,
 *      and finish with the receipt
 * 2. safeOrder(sku, qty): placeOrder, but every error becomes a message:
 *      UnknownSku      "we do not sell <sku>"
 *      OutOfStock      "sold out: <sku>"
 *      PaymentDeclined "payment declined"
 *    so it cannot fail.
 */
// I AM NOT DONE
import { Data, Effect } from "effect"

class UnknownSku extends Data.TaggedError("UnknownSku")<{ readonly sku: string }> {}
class OutOfStock extends Data.TaggedError("OutOfStock")<{ readonly sku: string; readonly wanted: number }> {}
class PaymentDeclined extends Data.TaggedError("PaymentDeclined")<{ readonly amount: number }> {}

const stock: Record<string, number> = { pen: 5, book: 0, tv: 2 }
const unitPrice: Record<string, number> = { pen: 3, book: 20, tv: 60 }

const stockOf = (sku: string): Effect.Effect<number, UnknownSku> =>
  sku in stock ? Effect.succeed(stock[sku]) : Effect.fail(new UnknownSku({ sku }))

const charge = (amount: number): Effect.Effect<string, PaymentDeclined> =>
  amount > 50 ? Effect.fail(new PaymentDeclined({ amount })) : Effect.succeed(`receipt-${amount}`)

const placeOrder: (sku: string, qty: number) => Effect.Effect<string, UnknownSku | OutOfStock | PaymentDeclined> = todo()
const safeOrder: (sku: string, qty: number) => Effect.Effect<string> = todo()

check("placeOrder succeeds", await Effect.runPromise(placeOrder("pen", 2)), "receipt-6")
check("placeOrder fails when out of stock", (await rejection(Effect.runPromise(placeOrder("book", 1)))) instanceof OutOfStock, true)
check("safe: success", await Effect.runPromise(safeOrder("pen", 2)), "receipt-6")
check("safe: unknown", await Effect.runPromise(safeOrder("kiwi", 1)), "we do not sell kiwi")
check("safe: too many", await Effect.runPromise(safeOrder("pen", 9)), "sold out: pen")
check("safe: sold out", await Effect.runPromise(safeOrder("book", 1)), "sold out: book")
check("safe: declined", await Effect.runPromise(safeOrder("tv", 1)), "payment declined")
