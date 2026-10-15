/**
 * Stream.ensuring(cleanup) runs `cleanup` when the stream ends, whether it
 * finished, failed, or was stopped early by take.
 *
 * Goal: log "closed" after the stream, even though take cuts it short.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"

const log: Array<string> = []
const cleanup = Effect.sync(() => { log.push("closed") })

const program: Effect.Effect<Array<number>> = todo()

check("values", await Effect.runPromise(program), [1, 2])
check("cleanup ran", log, ["closed"])
