/**
 * Plain TypeScript:
 *
 *   let count = 0
 *   const timer = setInterval(() => {
 *     poll()
 *     count += 1
 *     if (count === 3) clearInterval(timer)      // easy to forget
 *   }, 1000)
 *
 * With repeat there is no timer to clear, and if the fiber is interrupted
 * the repeating stops by itself.
 *
 * Write pollThree: it runs `poll` three times, one second apart.
 */
import { Effect, Fiber, Schedule } from "effect"
import { TestClock } from "effect/testing"

let polls = 0
const poll = Effect.sync(() => { polls += 1 })

const pollThree: Effect.Effect<void> = poll.pipe(
  Effect.repeat({ schedule: Schedule.spaced("1 second"), times: 2 }),
  Effect.asVoid
)

const test = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(pollThree)
  yield* TestClock.adjust("10 seconds")
  yield* Fiber.join(fiber)
  return polls
}).pipe(Effect.provide(TestClock.layer()))

check("polled exactly three times", await Effect.runPromise(test), 3)
