/**
 * Bring the chapter together.
 *
 * waitUntilReady(check) runs `check` right away, then once every second,
 * until it reports "ready", and finishes with "ready". If that has not
 * happened within ten seconds, it gives up and finishes with "gave up".
 * It must never fail.
 */
import { Effect, Fiber, Schedule } from "effect"
import { TestClock } from "effect/testing"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

type Status = "pending" | "ready"

const waitUntilReady = (checkStatus: Effect.Effect<Status>): Effect.Effect<Status | "gave up"> =>
  checkStatus.pipe(
    Effect.repeat({ schedule: Schedule.spaced("1 second"), until: (status) => status === "ready" }),
    Effect.timeout("10 seconds"),
    Effect.catchTag("TimeoutError", () => Effect.succeed("gave up" as const))
  )

const scenario = (readyOnCheck: number, seconds: number) => {
  let checks = 0
  const checkStatus = Effect.sync((): Status => (++checks >= readyOnCheck ? "ready" : "pending"))
  return Effect.gen(function*() {
    const fiber = yield* Effect.forkChild(waitUntilReady(checkStatus))
    yield* TestClock.adjust(`${seconds} seconds`)
    return { result: yield* Fiber.join(fiber), checks }
  }).pipe(Effect.provide(TestClock.layer()))
}

check("ready on the fourth check", await Effect.runPromise(scenario(4, 3)), { result: "ready", checks: 4 })
check("ready immediately", await Effect.runPromise(scenario(1, 0)), { result: "ready", checks: 1 })
check("never ready", (await Effect.runPromise(scenario(1000, 10))).result, "gave up")
