/**
 * Plain TypeScript:
 *
 *   async function checkout(cartId: string): Promise<number> {
 *     const cart = await loadCart(cartId)
 *     let total = 0
 *     for (const sku of cart.items) {
 *       total += await priceOf(sku)
 *     }
 *     return cart.express ? total + 5 : total
 *   }
 *
 * loadCart and priceOf already return Effects. Write `checkout`.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

interface Cart {
  readonly items: ReadonlyArray<string>
  readonly express: boolean
}

const loadCart = (id: string): Effect.Effect<Cart> => Effect.succeed({ items: ["a", "b"], express: id === "fast" })
const priceOf = (sku: string): Effect.Effect<number> => Effect.succeed(sku === "a" ? 10 : 20)

const checkout: (cartId: string) => Effect.Effect<number> = todo()

check("standard", Effect.runSync(checkout("slow")), 30)
check("express", Effect.runSync(checkout("fast")), 35)
