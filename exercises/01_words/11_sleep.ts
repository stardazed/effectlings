/**
 * Effect.sleep(duration) is a program that waits, then finishes with void.
 * Durations are written as text such as "20 millis", "2 seconds", "1 minute".
 *
 * Goal: define `pause` that waits 20 milliseconds.
 */
// I AM NOT DONE
import { Effect } from "effect"

const pause: Effect.Effect<void> = todo()

const start = Date.now()
await Effect.runPromise(pause)
checkTrue("waited at least 15ms", Date.now() - start >= 15)
