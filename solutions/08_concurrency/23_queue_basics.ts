/**
 * A Queue passes values between fibers.
 *
 *   Queue.unbounded<A>()         a queue with no size limit
 *   Queue.offer(queue, a)        add one value
 *   Queue.offerAll(queue, as)    add several
 *   Queue.take(queue)            remove the oldest; waits if the queue is empty
 *
 * Goal: put 1, then 2 and 3 into a queue, then take three values out.
 */
import { Effect, Queue } from "effect"

const program: Effect.Effect<Array<number>> = Effect.gen(function*() {
  const queue: Queue.Queue<number> = yield* Queue.unbounded<number>()
  yield* Queue.offer(queue, 1)
  yield* Queue.offerAll(queue, [2, 3])
  const a = yield* Queue.take(queue)
  const b = yield* Queue.take(queue)
  const c = yield* Queue.take(queue)
  return [a, b, c]
})

check("first in, first out", await Effect.runPromise(program), [1, 2, 3])
