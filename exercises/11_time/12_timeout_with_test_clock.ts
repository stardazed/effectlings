/**
 * Time-based code is where TestClock earns its keep. This task takes ten
 * minutes. A guard gives it one.
 *
 * Goal: write `outcome`, which forks the guarded task, advances the clock by
 * a minute and joins. It must finish immediately in real time.
 */
// I AM NOT DONE
import { Effect, Fiber } from "effect"
import { TestClock } from "effect/testing"

const slow = Effect.sleep("10 minutes").pipe(Effect.as("finished"))

const guarded = <A, E, R>(task: Effect.Effect<A, E, R>) =>
  task.pipe(
    Effect.timeout("1 minute"),
    Effect.catchTag("TimeoutError", () => Effect.succeed("too slow" as const))
  )

const outcome: Effect.Effect<string> = todo()

const started = Date.now()
check("the timeout fired", await Effect.runPromise(outcome), "too slow")
check("without waiting", Date.now() - started < 1000, true)
