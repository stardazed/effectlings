/**
 * Loops and conditions work exactly as they do in async functions, and
 * you can yield* inside them.
 *
 * Goal: add up the stock of every sku, then answer "low" when the sum is
 * under 10 and "ok" otherwise.
 */
// I AM NOT DONE
import { Effect } from "effect"

const stockOf = (sku: string): Effect.Effect<number> => Effect.succeed(sku.length)

const level = (skus: ReadonlyArray<string>): Effect.Effect<"low" | "ok"> => todo()

check("few small skus", Effect.runSync(level(["a", "bb"])), "low")
check("many long skus", Effect.runSync(level(["apple", "banana"])), "ok")
