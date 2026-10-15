/**
 * Plain TypeScript:
 *
 *   const total = orders
 *     .filter((o) => o.paid)
 *     .map((o) => o.amount)
 *     .reduce((sum, amount) => sum + amount, 0)
 *
 * With an array, every step builds a full intermediate array. With a stream
 * the values flow through one at a time, which matters when there are
 * millions of them. Write the stream version.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"

interface Order {
  readonly paid: boolean
  readonly amount: number
}

const paidTotal = (orders: ReadonlyArray<Order>): Effect.Effect<number> => todo()

check(
  "paid total",
  await Effect.runPromise(paidTotal([{ paid: true, amount: 10 }, { paid: false, amount: 99 }, { paid: true, amount: 5 }])),
  15
)
check("no orders", await Effect.runPromise(paidTotal([])), 0)
