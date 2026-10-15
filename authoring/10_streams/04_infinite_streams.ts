//#title Streams can be infinite
//#kind complete
//#teaches Stream.iterate
//#hint iterate takes a starting value and a function from the current value to the next.
//#hint Stream.iterate(..., (n) => ...).pipe(Stream.take(...), Stream.runCollect)
/**
 * Stream.iterate(start, next) produces start, next(start), next(next(start)),
 * and so on, forever. That is fine, because a stream is lazy: values are
 * produced only as they are needed. Stream.take stops the production.
 *
 * Goal: the first six powers of two, starting from 1.
 */
import { Effect, Stream } from "effect"

//#solution
const powersOfTwo: Effect.Effect<Array<number>> = Stream.iterate(1, (n) => n * 2).pipe(
  Stream.take(6),
  Stream.runCollect
)
//#exercise
const powersOfTwo: Effect.Effect<Array<number>> = todo()
//#end

check("powers of two", await Effect.runPromise(powersOfTwo), [1, 2, 4, 8, 16, 32])
