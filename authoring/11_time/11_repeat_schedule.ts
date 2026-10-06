//#title Repeating on a timer
//#kind complete
//#deepens Effect.repeat, Schedule.spaced
//#hint Give repeat a schedule for the pause and a limit for the count.
//#hint sample.pipe(Effect.repeat({ schedule: Schedule.spaced("1 second"), times: 2 }))
/**
 * A schedule works with repeat the same way it does with retry.
 *
 * Goal: take three samples, one second apart: now, after 1 second, and
 * after 2 seconds. The test drives the clock.
 */
import { Effect, Fiber, Schedule } from "effect"
import { TestClock } from "effect/testing"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let samples = 0
const sample = Effect.sync(() => ++samples)

//#solution
const sampler: Effect.Effect<number> = sample.pipe(Effect.repeat({ schedule: Schedule.spaced("1 second"), times: 2 }))
//#exercise
const sampler: Effect.Effect<number> = todo()
//#end

const test = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(sampler)
  yield* Effect.yieldNow // let the forked fiber start
  const counts: Array<number> = [samples]
  yield* TestClock.adjust("1 second")
  counts.push(samples)
  yield* TestClock.adjust("1 second")
  counts.push(samples)
  yield* Fiber.join(fiber)
  return counts
}).pipe(Effect.provide(TestClock.layer()))

check("samples over time", await Effect.runPromise(test), [1, 2, 3])
