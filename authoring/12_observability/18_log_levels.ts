//#title Showing debug messages
//#kind complete
//#teaches References.MinimumLogLevel
//#hint The minimum level is a service. Override it with Effect.provideService for just this program.
//#hint program.pipe(Effect.provideService(References.MinimumLogLevel, "Debug"))
/**
 * Debug lines are hidden unless the minimum log level allows them. That
 * level is a Reference (a service with a default), so you change it the
 * way you change any service:
 *
 *   Effect.provideService(References.MinimumLogLevel, "Debug")
 *
 * Goal: make `verbose` show its debug line, while `quiet` does not.
 */
import { Effect, References } from "effect"
import { recordLogs } from "../../src/observe.ts"

const work = Effect.logDebug("internal detail")

const quiet: Effect.Effect<void> = work
//#solution
const verbose: Effect.Effect<void> = work.pipe(Effect.provideService(References.MinimumLogLevel, "Debug"))
//#exercise
const verbose: Effect.Effect<void> = todo()
//#end

const { logs, layer } = recordLogs()
await Effect.runPromise(quiet.pipe(Effect.provide(layer)))
check("hidden by default", logs.length, 0)
await Effect.runPromise(verbose.pipe(Effect.provide(layer)))
check("shown when asked", logs.map((l) => l.message), ["internal detail"])
