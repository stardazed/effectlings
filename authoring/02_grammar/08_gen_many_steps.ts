//#title Many steps, plain code in between
//#kind complete
//#deepens Effect.gen, yield*
//#hint Yield each effect into a variable, then use ordinary arithmetic.
//#hint const price = yield* priceOf(sku); const qty = yield* quantityOf(sku); return price * qty
/**
 * Between yields, a generator is ordinary TypeScript: variables,
 * arithmetic, string templates, anything.
 *
 * Goal: for the given sku, produce the line total: price times quantity.
 */
import { Effect } from "effect"

const priceOf = (sku: string): Effect.Effect<number> => Effect.succeed(sku === "pen" ? 3 : 10)
const quantityOf = (sku: string): Effect.Effect<number> => Effect.succeed(sku === "pen" ? 4 : 1)

//#solution
const lineTotal = (sku: string): Effect.Effect<number> =>
  Effect.gen(function*() {
    const price = yield* priceOf(sku)
    const quantity = yield* quantityOf(sku)
    return price * quantity
  })
//#exercise
const lineTotal = (sku: string): Effect.Effect<number> => todo()
//#end

check("pens", Effect.runSync(lineTotal("pen")), 12)
check("books", Effect.runSync(lineTotal("book")), 10)
