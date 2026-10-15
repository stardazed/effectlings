/**
 * Effect.timeout(duration) fails with a TimeoutError if the program takes
 * longer than the duration. The slow program is interrupted.
 *
 * TimeoutError is a tagged error like the ones you wrote, so catchTag works.
 *
 * Goal: give `slow` five milliseconds, and answer "gave up" if it is late.
 */
// I AM NOT DONE
import { Effect } from "effect"

const slow = Effect.sleep("50 millis").pipe(Effect.as("finished"))

const guarded: Effect.Effect<string> = todo()

check("late", await Effect.runPromise(guarded), "gave up")
check("in time", await Effect.runPromise(Effect.succeed("quick").pipe(Effect.timeout("50 millis"))), "quick")
