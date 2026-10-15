//#title Logging failures as they pass
//#kind complete
//#deepens Effect.tapError, Effect.logError, Effect.catch
//#hint tapError runs an effect for the error without handling it. logError is such an effect.
//#hint call.pipe(Effect.tapError((e) => Effect.logError(`call failed: ${e}`)), Effect.catch(() => Effect.succeed("fallback")))
/**
 * Combine what you know: log the failure, then recover from it.
 *
 * Goal: when `call` fails, log "call failed: <reason>" at error level and
 * answer "fallback".
 */
import { Effect } from "effect"
import { recordLogs } from "../../src/observe.ts"

const call: Effect.Effect<string, string> = Effect.fail("timeout")

//#solution
const safeCall: Effect.Effect<string> = call.pipe(
  Effect.tapError((reason) => Effect.logError(`call failed: ${reason}`)),
  Effect.catch(() => Effect.succeed("fallback"))
)
//#exercise
const safeCall: Effect.Effect<string> = todo()
//#end

const { logs, layer } = recordLogs()
check("result", await Effect.runPromise(safeCall.pipe(Effect.provide(layer))), "fallback")
check("logged", logs.map((l) => `${l.level}: ${l.message}`), ["Error: call failed: timeout"])
