//#title The current time, as a dependency
//#kind complete
//#teaches DateTime.now, TestClock.setTime
//#hint DateTime.now is an Effect. It reads the Clock, so a test can set the time.
//#hint const now = yield* DateTime.now; return DateTime.isGreaterThan(now, deadline)
/**
 * Calling `new Date()` hides a dependency on the system clock, which makes
 * code hard to test. DateTime.now is an Effect that reads the Clock service
 * instead. Under TestClock you can pick the time:
 *
 *   TestClock.setTime(millis)    set the test clock to an exact instant
 *
 * Goal: isExpired(deadline) is true when the current time is after the deadline.
 */
import { DateTime, Effect } from "effect"
import { TestClock } from "effect/testing"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const isExpired = (deadline: DateTime.Utc): Effect.Effect<boolean> =>
  Effect.gen(function*() {
    const now = yield* DateTime.now
    return DateTime.isGreaterThan(now, deadline)
  })
//#exercise
const isExpired = (deadline: DateTime.Utc): Effect.Effect<boolean> => todo()
//#end

const deadline = DateTime.makeUnsafe("2026-01-15T10:00:00Z")
const at = (iso: string) =>
  Effect.gen(function*() {
    yield* TestClock.setTime(DateTime.toEpochMillis(DateTime.makeUnsafe(iso)))
    return yield* isExpired(deadline)
  }).pipe(Effect.provide(TestClock.layer()))

check("before the deadline", await Effect.runPromise(at("2026-01-15T09:59:59Z")), false)
check("after the deadline", await Effect.runPromise(at("2026-01-15T10:00:01Z")), true)
