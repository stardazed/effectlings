/**
 * Bounded queues make producers wait. A dropping queue refuses instead:
 * when it is full, offer returns false and the value is discarded. Good for
 * "latest is not important" traffic like metrics.
 *
 *   Queue.dropping<A>(n)   Queue.offer returns a boolean
 *   Queue.takeAll(queue)   take everything currently in the queue
 *
 * Goal: offer 1, 2, 3 to a dropping queue of size 2. Return whether each
 * was accepted, and what the queue ended up holding.
 */
import { Effect, Queue } from "effect"

const program: Effect.Effect<{ accepted: Array<boolean>; kept: ReadonlyArray<number> }> = Effect.gen(function*() {
  const queue = yield* Queue.dropping<number>(2)
  const first = yield* Queue.offer(queue, 1)
  const second = yield* Queue.offer(queue, 2)
  const third = yield* Queue.offer(queue, 3)
  const kept = yield* Queue.takeAll(queue)
  return { accepted: [first, second, third], kept }
})

check("accepted", (await Effect.runPromise(program)).accepted, [true, true, false])
check("kept", [...(await Effect.runPromise(program)).kept], [1, 2])
