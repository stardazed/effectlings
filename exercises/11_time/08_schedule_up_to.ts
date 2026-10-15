/**
 * Schedule.exponential never ends by itself. Schedule.upTo limits any
 * schedule by number of repetitions, by elapsed time, or both:
 *
 *   schedule.pipe(Schedule.upTo({ times: 3 }))
 *   schedule.pipe(Schedule.upTo({ duration: "10 seconds" }))
 *
 * Goal: exponential backoff from 100ms that gives up after 3 retries.
 * The task never succeeds, so the program must end in failure, after
 * exactly 4 attempts.
 */
// I AM NOT DONE
import { Effect, Exit, Fiber, Schedule } from "effect"
import { TestClock } from "effect/testing"

const policy: Schedule.Schedule<unknown> = todo()

let attempts = 0
const neverWorks: Effect.Effect<never, "down"> = Effect.suspend(() => {
  attempts += 1
  return Effect.fail("down" as const)
})

const test = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(neverWorks.pipe(Effect.retry(policy)))
  yield* TestClock.adjust("1 hour")
  return yield* Fiber.await(fiber)
}).pipe(Effect.provide(TestClock.layer()))

const exit = await Effect.runPromise(test)
check("it ended in failure", Exit.isFailure(exit), true)
check("after four attempts", attempts, 4)
