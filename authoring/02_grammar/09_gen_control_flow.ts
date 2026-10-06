//#title if and for inside a generator
//#kind complete
//#deepens Effect.gen, yield*
//#hint Use a normal for...of loop and yield* inside it.
//#hint let total = 0; for (const sku of skus) { total += yield* stockOf(sku) }; return total < 10 ? "low" : "ok"
/**
 * Loops and conditions work exactly as they do in async functions, and
 * you can yield* inside them.
 *
 * Goal: add up the stock of every sku, then answer "low" when the sum is
 * under 10 and "ok" otherwise.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const stockOf = (sku: string): Effect.Effect<number> => Effect.succeed(sku.length)

//#solution
const level = (skus: ReadonlyArray<string>): Effect.Effect<"low" | "ok"> =>
  Effect.gen(function*() {
    let total = 0
    for (const sku of skus) {
      total += yield* stockOf(sku)
    }
    return total < 10 ? "low" : "ok"
  })
//#exercise
const level = (skus: ReadonlyArray<string>): Effect.Effect<"low" | "ok"> => todo()
//#end

check("few small skus", Effect.runSync(level(["a", "bb"])), "low")
check("many long skus", Effect.runSync(level(["apple", "banana"])), "ok")
