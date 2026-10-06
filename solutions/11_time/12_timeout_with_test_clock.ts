/**
 * Time-based code is where TestClock earns its keep. This task takes ten
 * minutes. A guard gives it one.
 *
 * Goal: write `outcome`, which forks the guarded task, advances the clock by
 * a minute and joins. It must finish immediately in real time.
 */
import { Effect, Fiber } from "effect"
import { TestClock } from "effect/testing"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const slow = Effect.sleep("10 minutes").pipe(Effect.as("finished"))

const guarded = <A, E, R>(task: Effect.Effect<A, E, R>) =>
  task.pipe(
    Effect.timeout("1 minute"),
    Effect.catchTag("TimeoutError", () => Effect.succeed("too slow" as const))
  )

const outcome = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(guarded(slow))
  yield* TestClock.adjust("1 minute")
  return yield* Fiber.join(fiber)
}).pipe(Effect.provide(TestClock.layer()))

const started = Date.now()
check("the timeout fired", await Effect.runPromise(outcome), "too slow")
check("without waiting", Date.now() - started < 1000, true)
