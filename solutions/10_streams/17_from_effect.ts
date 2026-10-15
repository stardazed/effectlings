/**
 *   Stream.fromEffect(effect)   a stream of exactly one value, from the effect
 *   Stream.forever              repeat the whole stream again and again
 *
 * Together they sample an effect over and over. Stream.take ends it.
 *
 * Goal: read the sensor three times.
 */
import { Effect, Stream } from "effect"

let reading = 0
const readSensor = Effect.sync(() => ++reading * 10)

const samples: Effect.Effect<Array<number>> = Stream.fromEffect(readSensor).pipe(
  Stream.forever,
  Stream.take(3),
  Stream.runCollect
)

check("samples", await Effect.runPromise(samples), [10, 20, 30])
