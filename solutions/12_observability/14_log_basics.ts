/**
 * Logging is an Effect, not console.log, so it can be redirected, filtered
 * and captured in tests.
 *
 *   Effect.log(...)          the default level (Info)
 *   Effect.logInfo(...)      Info
 *   Effect.logWarning(...)   Warn
 *   Effect.logError(...)     Error
 *   Effect.logDebug(...)     Debug (hidden by default)
 *
 * Goal: log "started" at info, "slow" as a warning, "failed" as an error,
 * and "details" at debug.
 *
 * The test installs a recording logger from src/observe.ts. By default
 * Effect hides debug messages, so you will see only three of your four lines.
 */
import { Effect } from "effect"
import { recordLogs } from "../../src/observe.ts"

const program: Effect.Effect<void> = Effect.gen(function*() {
  yield* Effect.logInfo("started")
  yield* Effect.logWarning("slow")
  yield* Effect.logError("failed")
  yield* Effect.logDebug("details")
})

const { logs, layer } = recordLogs()
await Effect.runPromise(program.pipe(Effect.provide(layer)))

check("what was logged", logs.map((l) => `${l.level}: ${l.message}`), ["Info: started", "Warn: slow", "Error: failed"])
