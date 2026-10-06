//#title Taking part of a stream
//#kind complete
//#teaches Stream.take, Stream.drop
//#hint take keeps the first n values, drop skips them.
//#hint Stream.range(1, 10).pipe(Stream.drop(2), Stream.take(3), Stream.runCollect)
/**
 *   Stream.take(n)   only the first n values (then the stream stops)
 *   Stream.drop(n)   skip the first n values
 *
 * Goal: from the numbers 1 to 10, skip two and keep the next three.
 */
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const middle: Effect.Effect<Array<number>> = Stream.range(1, 10).pipe(
  Stream.drop(2),
  Stream.take(3),
  Stream.runCollect
)
//#exercise
const middle: Effect.Effect<Array<number>> = todo()
//#end

check("middle", await Effect.runPromise(middle), [3, 4, 5])
