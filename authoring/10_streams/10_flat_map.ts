//#title One value, many values
//#kind complete
//#teaches Stream.flatMap
//#hint The function you give to flatMap returns a Stream. Everything it produces is emitted in place of the original value.
//#hint Stream.flatMap((n) => Stream.make(n, n * 10))
/**
 * Stream.flatMap(f) replaces each value with the stream f returns, and
 * joins them together in order.
 *
 * Goal: replace each number n with n and then n times ten.
 */
import { Effect, Stream } from "effect"

//#solution
const expanded: Effect.Effect<Array<number>> = Stream.make(1, 2, 3).pipe(
  Stream.flatMap((n) => Stream.make(n, n * 10)),
  Stream.runCollect
)
//#exercise
const expanded: Effect.Effect<Array<number>> = todo()
//#end

check("expanded", await Effect.runPromise(expanded), [1, 10, 2, 20, 3, 30])
