/**
 * Stream.ensuring(cleanup) runs `cleanup` when the stream ends, whether it
 * finished, failed, or was stopped early by take.
 *
 * Goal: log "closed" after the stream, even though take cuts it short.
 */
import { Effect, Stream } from "effect"

const log: Array<string> = []
const cleanup = Effect.sync(() => { log.push("closed") })

const program: Effect.Effect<Array<number>> = Stream.iterate(1, (n) => n + 1).pipe(
  Stream.ensuring(cleanup),
  Stream.take(2),
  Stream.runCollect
)

check("values", await Effect.runPromise(program), [1, 2])
check("cleanup ran", log, ["closed"])
