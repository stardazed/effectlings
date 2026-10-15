/**
 * If an effect inside a stream fails, the stream ends with that failure.
 * The values produced before it were already delivered.
 *
 * Stream.catch(handler) recovers: the handler receives the error and
 * returns a stream that continues from there.
 *
 * Goal: if validation fails, finish with the value -1 instead of failing.
 */
import { Effect, Stream } from "effect"

const source = Stream.make(1, 2, 3).pipe(
  Stream.mapEffect((n) => (n === 3 ? Effect.fail("bad value" as const) : Effect.succeed(n)))
)

const recovered: Effect.Effect<Array<number>> = source.pipe(
  Stream.catch(() => Stream.make(-1)),
  Stream.runCollect
)

check("recovered", await Effect.runPromise(recovered), [1, 2, -1])
check("without catch the stream fails", String(await Effect.runPromise(Effect.exit(Stream.runCollect(source)))).includes("bad value"), true)
