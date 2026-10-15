/**
 * Queues and streams fit together: a producer offers values, a stream
 * reads them. Stream.fromQueue(queue) needs to know when to stop, so the
 * queue has a second type parameter that includes Cause.Done, and
 * Queue.end(queue) signals "no more values".
 *
 * Goal: put 1, 2, 3 in a queue, end it, and read the values as a stream.
 */
import { Cause, Effect, Queue, Stream } from "effect"

const program: Effect.Effect<Array<number>> = Effect.gen(function*() {
  const queue = yield* Queue.unbounded<number, Cause.Done>()
  yield* Queue.offerAll(queue, [1, 2, 3])
  yield* Queue.end(queue)
  return yield* Stream.fromQueue(queue).pipe(Stream.runCollect)
})

check("values", await Effect.runPromise(program), [1, 2, 3])
