/**
 * Retrying instantly can hammer a struggling server. Schedule.spaced(duration)
 * waits that long between attempts. retry accepts a schedule together with
 * a limit:
 *
 *   Effect.retry({ schedule: Schedule.spaced("1 second"), times: 5 })
 *
 * Goal: retry every second. The test below drives the clock and checks the
 * number of attempts after each second.
 */
import { Effect, Fiber, Schedule } from "effect"
import { TestClock } from "effect/testing"

let attempts = 0
const task: Effect.Effect<string, "busy"> = Effect.suspend(() => {
  attempts += 1
  return attempts < 3 ? Effect.fail("busy" as const) : Effect.succeed("done")
})

const patient: Effect.Effect<string, "busy"> = task.pipe(Effect.retry({ schedule: Schedule.spaced("1 second"), times: 5 }))

const test = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(patient)
  yield* Effect.yieldNow // let the forked fiber start
  const afterStart = attempts
  yield* TestClock.adjust("1 second")
  const afterOneSecond = attempts
  yield* TestClock.adjust("1 second")
  return { afterStart, afterOneSecond, afterTwoSeconds: attempts, result: yield* Fiber.join(fiber) }
}).pipe(Effect.provide(TestClock.layer()))

check("timeline", await Effect.runPromise(test), {
  afterStart: 1,
  afterOneSecond: 2,
  afterTwoSeconds: 3,
  result: "done"
})
