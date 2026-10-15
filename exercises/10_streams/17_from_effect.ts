/**
 *   Stream.fromEffect(effect)   a stream of exactly one value, from the effect
 *   Stream.forever              repeat the whole stream again and again
 *
 * Together they sample an effect over and over. Stream.take ends it.
 *
 * Goal: read the sensor three times.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"

let reading = 0
const readSensor = Effect.sync(() => ++reading * 10)

const samples: Effect.Effect<Array<number>> = todo()

check("samples", await Effect.runPromise(samples), [10, 20, 30])
