/**
 * Between yields, a generator is ordinary TypeScript: variables,
 * arithmetic, string templates, anything.
 *
 * Goal: for the given sku, produce the line total: price times quantity.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const priceOf = (sku: string): Effect.Effect<number> => Effect.succeed(sku === "pen" ? 3 : 10)
const quantityOf = (sku: string): Effect.Effect<number> => Effect.succeed(sku === "pen" ? 4 : 1)

const lineTotal = (sku: string): Effect.Effect<number> => todo()

check("pens", Effect.runSync(lineTotal("pen")), 12)
check("books", Effect.runSync(lineTotal("book")), 10)
