/**
 * Stream.scan(() => initial, f) is a fold that keeps every step: it emits
 * the initial value, then the value after each input.
 *
 * Goal: the running total of 1, 2, 3, 4.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"

const runningTotal: Effect.Effect<Array<number>> = todo()

check("running total", await Effect.runPromise(runningTotal), [0, 1, 3, 6, 10])
