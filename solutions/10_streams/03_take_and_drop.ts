/**
 *   Stream.take(n)   only the first n values (then the stream stops)
 *   Stream.drop(n)   skip the first n values
 *
 * Goal: from the numbers 1 to 10, skip two and keep the next three.
 */
import { Effect, Stream } from "effect"

const middle: Effect.Effect<Array<number>> = Stream.range(1, 10).pipe(
  Stream.drop(2),
  Stream.take(3),
  Stream.runCollect
)

check("middle", await Effect.runPromise(middle), [3, 4, 5])
