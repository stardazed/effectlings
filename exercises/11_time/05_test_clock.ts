/**
 * Waiting an hour in a test is not an option. TestClock replaces the real
 * clock with one that only moves when you tell it to:
 *
 *   Effect.provide(TestClock.layer())   run a program with the test clock
 *   TestClock.adjust("1 hour")          jump the clock forward by an hour
 *
 * Everything that sleeps, times out or is scheduled sees the fake time.
 * The usual pattern: fork the program, adjust the clock, then join.
 *
 * Goal: wake the sleeping fiber by moving the clock.
 */
// I AM NOT DONE
import { Effect, Fiber } from "effect"
import { TestClock } from "effect/testing"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const moveClock: Effect.Effect<void> = todo() // move the clock forward by one hour

const program = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(Effect.sleep("1 hour").pipe(Effect.as("woke up")))
  yield* moveClock
  return yield* Fiber.join(fiber)
}).pipe(Effect.provide(TestClock.layer()))

const started = Date.now()
check("result", await Effect.runPromise(program), "woke up")
check("and it did not take an hour", Date.now() - started < 1000, true)
