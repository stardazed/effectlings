/**
 * Queue.bounded(n) holds at most n values. When it is full, offer waits
 * (suspends) until there is room. That slows a fast producer down to the
 * speed of its consumer. It is called backpressure.
 *
 * Here a producer offers 1, 2, 3 into a queue of capacity 1, and nobody
 * takes anything for 5ms. Predict how many offers have completed by then.
 */
// I AM NOT DONE
import { Effect, Fiber, Queue } from "effect"

let offered = 0

const program = Effect.gen(function*() {
  const queue = yield* Queue.bounded<number>(1)
  const producer = yield* Effect.forkChild(
    Effect.gen(function*() {
      for (const n of [1, 2, 3]) {
        yield* Queue.offer(queue, n)
        offered += 1
      }
    })
  )
  yield* Effect.sleep("5 millis")
  const offeredWhileNobodyTakes = offered
  for (let i = 0; i < 3; i++) yield* Queue.take(queue)
  yield* Fiber.join(producer)
  return offeredWhileNobodyTakes
})

const observed = await Effect.runPromise(program)

const expected: number = todo()

check("offers completed while the queue was full", observed, expected)
check("all offers completed in the end", offered, 3)
