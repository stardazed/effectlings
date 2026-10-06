//#title A stream from one Effect
//#kind complete
//#teaches Stream.fromEffect, Stream.forever
//#hint fromEffect runs the effect once per pull when combined with forever.
//#hint Stream.fromEffect(readSensor).pipe(Stream.forever, Stream.take(3), Stream.runCollect)
/**
 *   Stream.fromEffect(effect)   a stream of exactly one value, from the effect
 *   Stream.forever              repeat the whole stream again and again
 *
 * Together they sample an effect over and over. Stream.take ends it.
 *
 * Goal: read the sensor three times.
 */
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let reading = 0
const readSensor = Effect.sync(() => ++reading * 10)

//#solution
const samples: Effect.Effect<Array<number>> = Stream.fromEffect(readSensor).pipe(
  Stream.forever,
  Stream.take(3),
  Stream.runCollect
)
//#exercise
const samples: Effect.Effect<Array<number>> = todo()
//#end

check("samples", await Effect.runPromise(samples), [10, 20, 30])
