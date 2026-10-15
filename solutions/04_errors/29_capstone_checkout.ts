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

const placeOrder: (sku: string, qty: number) => Effect.Effect<string, UnknownSku | OutOfStock | PaymentDeclined> =
  Effect.fn("placeOrder")(function*(sku: string, qty: number) {
    const available = yield* stockOf(sku)
    if (available < qty) return yield* new OutOfStock({ sku, wanted: qty })
    return yield* charge(unitPrice[sku] * qty)
  })

const safeOrder: (sku: string, qty: number) => Effect.Effect<string> = (sku, qty) =>
  placeOrder(sku, qty).pipe(
    Effect.catchTags({
      UnknownSku: (e) => Effect.succeed(`we do not sell ${e.sku}`),
      OutOfStock: (e) => Effect.succeed(`sold out: ${e.sku}`),
      PaymentDeclined: () => Effect.succeed("payment declined")
    })
  )

check("placeOrder succeeds", await Effect.runPromise(placeOrder("pen", 2)), "receipt-6")
check("placeOrder fails when out of stock", (await rejection(Effect.runPromise(placeOrder("book", 1)))) instanceof OutOfStock, true)
check("safe: success", await Effect.runPromise(safeOrder("pen", 2)), "receipt-6")
check("safe: unknown", await Effect.runPromise(safeOrder("kiwi", 1)), "we do not sell kiwi")
check("safe: too many", await Effect.runPromise(safeOrder("pen", 9)), "sold out: pen")
check("safe: sold out", await Effect.runPromise(safeOrder("book", 1)), "sold out: book")
check("safe: declined", await Effect.runPromise(safeOrder("tv", 1)), "payment declined")
