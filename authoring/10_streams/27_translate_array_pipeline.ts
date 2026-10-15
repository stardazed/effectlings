//#title Translate: an array pipeline
//#kind translate
//#deepens Stream.fromIterable, Stream.filter, Stream.map, Stream.runCollect, Stream.runSum
//#hint Each array method has a stream twin. The final reduce becomes runSum.
//#hint Stream.fromIterable(orders).pipe(Stream.filter(...), Stream.map(...), Stream.runSum)
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
import { Effect, Stream } from "effect"

interface Order {
  readonly paid: boolean
  readonly amount: number
}

//#solution
const paidTotal = (orders: ReadonlyArray<Order>): Effect.Effect<number> =>
  Stream.fromIterable(orders).pipe(
    Stream.filter((o) => o.paid),
    Stream.map((o) => o.amount),
    Stream.runSum
  )
//#exercise
const paidTotal = (orders: ReadonlyArray<Order>): Effect.Effect<number> => todo()
//#end

check(
  "paid total",
  await Effect.runPromise(paidTotal([{ paid: true, amount: 10 }, { paid: false, amount: 99 }, { paid: true, amount: 5 }])),
  15
)
check("no orders", await Effect.runPromise(paidTotal([])), 0)
