/**
 * Waiting the same time every attempt is better than none, but a server
 * that is struggling needs breathing room. Schedule.exponential(base)
 * doubles the wait each time:
 *
 *   Schedule.exponential("100 millis")   100ms, 200ms, 400ms, 800ms, ...
 *
 * Goal: retry with exponential backoff starting at 100 milliseconds. The
 * test advances the clock by exactly the delays and counts attempts.
 */
// I AM NOT DONE
import { Effect, Fiber, Schedule } from "effect"
import { TestClock } from "effect/testing"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let attempts = 0
const task: Effect.Effect<number, "busy"> = Effect.suspend(() => {
  attempts += 1
  return attempts < 4 ? Effect.fail("busy" as const) : Effect.succeed(attempts)
})

const backoff: Effect.Effect<number, "busy"> = todo()

const test = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(backoff)
  yield* Effect.yieldNow // let the forked fiber start
  const counts: Array<number> = [attempts]
  yield* TestClock.adjust("100 millis")
  counts.push(attempts)
  yield* TestClock.adjust("200 millis")
  counts.push(attempts)
  yield* TestClock.adjust("400 millis")
  counts.push(attempts)
  return { counts, result: yield* Fiber.join(fiber) }
}).pipe(Effect.provide(TestClock.layer()))

check("attempts after each delay", await Effect.runPromise(test), { counts: [1, 2, 3, 4], result: 4 })
