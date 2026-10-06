/**
 * Effect.addFinalizer(f) registers a cleanup on the current scope without
 * acquiring anything. The cleanup runs when the scope closes.
 *
 *   yield* Effect.addFinalizer((exit) => cleanupEffect)
 *
 * Use it when the thing to clean up was not created by acquireRelease.
 * Like acquireRelease, it needs a scope, so run the program in Effect.scoped.
 *
 * Goal: log "body", register a finalizer that logs "cleanup", and finish with "done".
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []

const program: Effect.Effect<string> = todo()

check("result", await Effect.runPromise(program), "done")
check("log", log, ["body", "cleanup"])
