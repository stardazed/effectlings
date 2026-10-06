//#title Failures in a stream
//#kind complete
//#teaches Stream.catch
//#deepens Stream.mapEffect, Effect.exit
//#hint A failure ends the stream. Stream.catch replaces the rest of it with another stream.
//#hint source.pipe(Stream.catch(() => Stream.make(-1)))
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
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const source = Stream.make(1, 2, 3).pipe(
  Stream.mapEffect((n) => (n === 3 ? Effect.fail("bad value" as const) : Effect.succeed(n)))
)

//#solution
const recovered: Effect.Effect<Array<number>> = source.pipe(
  Stream.catch(() => Stream.make(-1)),
  Stream.runCollect
)
//#exercise
const recovered: Effect.Effect<Array<number>> = todo()
//#end

check("recovered", await Effect.runPromise(recovered), [1, 2, -1])
check("without catch the stream fails", String(await Effect.runPromise(Effect.exit(Stream.runCollect(source)))).includes("bad value"), true)
