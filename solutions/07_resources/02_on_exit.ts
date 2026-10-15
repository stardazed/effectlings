/**
 * Effect.ensuring runs blindly. Effect.onExit hands your cleanup the Exit,
 * so it can react differently to success and failure:
 *
 *   task.pipe(Effect.onExit((exit) => cleanupEffect))
 *
 * Goal: record "succeeded" or "failed" depending on how the task ended.
 */
import { Effect, Exit } from "effect"

const log: Array<string> = []

const recorded = <A, E>(task: Effect.Effect<A, E>): Effect.Effect<A, E> =>
  task.pipe(Effect.onExit((exit) => Effect.sync(() => { log.push(Exit.isSuccess(exit) ? "succeeded" : "failed") })))

await Effect.runPromiseExit(recorded(Effect.succeed(1)))
await Effect.runPromiseExit(recorded(Effect.fail("boom")))
check("log", log, ["succeeded", "failed"])
