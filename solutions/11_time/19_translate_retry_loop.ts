/**
 * Plain TypeScript:
 *
 *   async function withRetry<T>(call: () => Promise<T>): Promise<T> {
 *     let delay = 100
 *     for (let attempt = 0; ; attempt++) {
 *       try {
 *         return await call()
 *       } catch (error) {
 *         if (attempt === 3) throw error
 *         await new Promise((resolve) => setTimeout(resolve, delay))
 *         delay *= 2
 *       }
 *     }
 *   }
 *
 * Write the same policy: up to three retries, waiting 100ms, 200ms, 400ms.
 */
import { Effect, Fiber, Schedule } from "effect"
import { TestClock } from "effect/testing"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const withRetry = <A, E>(call: Effect.Effect<A, E>): Effect.Effect<A, E> =>
  call.pipe(Effect.retry({ schedule: Schedule.exponential("100 millis"), times: 3 }))

let attempts = 0
const flaky = Effect.suspend(() => {
  attempts += 1
  return attempts <= 3 ? Effect.fail("down" as const) : Effect.succeed("up")
})

const test = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(withRetry(flaky))
  yield* TestClock.adjust("700 millis")
  return yield* Fiber.join(fiber)
}).pipe(Effect.provide(TestClock.layer()))

check("it succeeded on the fourth attempt", await Effect.runPromise(test), "up")
check("attempts", attempts, 4)
