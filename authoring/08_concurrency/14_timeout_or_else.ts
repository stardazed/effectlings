//#title A fallback on timeout
//#kind complete
//#teaches Effect.timeoutOrElse
//#hint timeoutOrElse takes one object: the duration and an orElse function.
//#hint slow.pipe(Effect.timeoutOrElse({ duration: ..., orElse: () => ... }))
/**
 * Effect.timeoutOrElse({ duration, orElse }) does the timeout and the
 * recovery in one step: when time runs out, it runs `orElse` instead.
 *
 * Goal: the same as before, in one call.
 */
import { Effect } from "effect"

const slow = Effect.sleep("50 millis").pipe(Effect.as("finished"))

//#solution
const guarded: Effect.Effect<string> = slow.pipe(
  Effect.timeoutOrElse({ duration: "5 millis", orElse: () => Effect.succeed("fallback") })
)
//#exercise
const guarded: Effect.Effect<string> = todo()
//#end

check("late", await Effect.runPromise(guarded), "fallback")
