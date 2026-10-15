//#title Cleanup when a stream ends
//#kind complete
//#teaches Stream.ensuring
//#hint Stream.ensuring takes the cleanup Effect, like Effect.ensuring.
//#hint Stream.make(1, 2).pipe(Stream.ensuring(cleanup), Stream.runCollect)
/**
 * Stream.ensuring(cleanup) runs `cleanup` when the stream ends, whether it
 * finished, failed, or was stopped early by take.
 *
 * Goal: log "closed" after the stream, even though take cuts it short.
 */
import { Effect, Stream } from "effect"

const log: Array<string> = []
const cleanup = Effect.sync(() => { log.push("closed") })

//#solution
const program: Effect.Effect<Array<number>> = Stream.iterate(1, (n) => n + 1).pipe(
  Stream.ensuring(cleanup),
  Stream.take(2),
  Stream.runCollect
)
//#exercise
const program: Effect.Effect<Array<number>> = todo()
//#end

check("values", await Effect.runPromise(program), [1, 2])
check("cleanup ran", log, ["closed"])
