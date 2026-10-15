/**
 * The classic shape: one fiber produces values, another consumes them, and
 * a queue sits between them.
 *
 * Goal: a consumer fiber takes three numbers from the queue and returns
 * their sum. The main fiber produces 1, 2 and 3, then joins the consumer.
 */
import { Effect, Fiber, Queue } from "effect"

const program: Effect.Effect<number> = Effect.gen(function*() {
  const queue = yield* Queue.unbounded<number>()
  const consumer = yield* Effect.forkChild(
    Effect.gen(function*() {
      let sum = 0
      for (let i = 0; i < 3; i++) sum += yield* Queue.take(queue)
      return sum
    })
  )
  for (const n of [1, 2, 3]) yield* Queue.offer(queue, n)
  return yield* Fiber.join(consumer)
})

check("sum", await Effect.runPromise(program), 6)
