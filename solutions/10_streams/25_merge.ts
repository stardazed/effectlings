/**
 * Stream.concat plays one stream after another. Stream.merge runs both AT
 * THE SAME TIME and emits whatever arrives first, so the order follows the
 * timing, not the stream.
 *
 * Goal: merge a fast ticker (a value every 20ms: f1, f2, f3) with a slow one
 * (one value, s1, after 50ms).
 */
import { Effect, Stream } from "effect"

const fast = Stream.make("f1", "f2", "f3").pipe(Stream.mapEffect((v) => Effect.sleep("20 millis").pipe(Effect.as(v))))
const slow = Stream.fromEffect(Effect.sleep("50 millis").pipe(Effect.as("s1")))

const merged: Effect.Effect<Array<string>> = Stream.merge(fast, slow).pipe(Stream.runCollect)

check("arrival order", await Effect.runPromise(merged), ["f1", "f2", "s1", "f3"])
