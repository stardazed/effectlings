/**
 * Combine what you know: log the failure, then recover from it.
 *
 * Goal: when `call` fails, log "call failed: <reason>" at error level and
 * answer "fallback".
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { recordLogs } from "../../src/observe.ts"
import { todo } from "../../src/todo.ts"

const call: Effect.Effect<string, string> = Effect.fail("timeout")

const safeCall: Effect.Effect<string> = todo()

const { logs, layer } = recordLogs()
check("result", await Effect.runPromise(safeCall.pipe(Effect.provide(layer))), "fallback")
check("logged", logs.map((l) => `${l.level}: ${l.message}`), ["Error: call failed: timeout"])
