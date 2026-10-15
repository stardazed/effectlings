/**
 * Effect.timeoutOrElse({ duration, orElse }) does the timeout and the
 * recovery in one step: when time runs out, it runs `orElse` instead.
 *
 * Goal: the same as before, in one call.
 */
// I AM NOT DONE
import { Effect } from "effect"

const slow = Effect.sleep("50 millis").pipe(Effect.as("finished"))

const guarded: Effect.Effect<string> = todo()

check("late", await Effect.runPromise(guarded), "fallback")
