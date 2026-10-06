//#title Registering cleanup by hand
//#kind complete
//#teaches Effect.addFinalizer
//#hint addFinalizer takes a function that returns the cleanup Effect. It must run inside a scope.
//#hint yield* Effect.addFinalizer(() => Effect.sync(() => { log.push("cleanup") }))
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
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []

//#solution
const program = Effect.scoped(
  Effect.gen(function*() {
    yield* Effect.addFinalizer(() => Effect.sync(() => { log.push("cleanup") }))
    log.push("body")
    return "done"
  })
)
//#exercise
const program: Effect.Effect<string> = todo()
//#end

check("result", await Effect.runPromise(program), "done")
check("log", log, ["body", "cleanup"])
