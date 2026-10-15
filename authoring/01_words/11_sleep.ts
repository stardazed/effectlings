//#title Waiting
//#kind complete
//#teaches Effect.sleep
//#hint Durations can be written as text, like "20 millis" or "1 second".
//#hint Effect.sleep("20 millis")
/**
 * Effect.sleep(duration) is a program that waits, then finishes with void.
 * Durations are written as text such as "20 millis", "2 seconds", "1 minute".
 *
 * Goal: define `pause` that waits 20 milliseconds.
 */
import { Effect } from "effect"

//#solution
const pause: Effect.Effect<void> = Effect.sleep("20 millis")
//#exercise
const pause: Effect.Effect<void> = todo()
//#end

const start = Date.now()
await Effect.runPromise(pause)
checkTrue("waited at least 15ms", Date.now() - start >= 15)
