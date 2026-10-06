/**
 * Effect.forkScoped(program) starts a fiber whose lifetime is the current
 * scope, not the current fiber. When the scope closes, the fiber is
 * interrupted. That is how a service keeps a background worker for as long
 * as the service itself lives.
 *
 * Goal: write startWorker, which starts `worker` in the scope and returns.
 */
import { Effect, Scope } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []

const worker = Effect.gen(function*() {
  log.push("worker started")
  return yield* Effect.never
}).pipe(Effect.onInterrupt(() => Effect.sync(() => { log.push("worker stopped") })))

const startWorker: Effect.Effect<void, never, Scope.Scope> = Effect.gen(function*() {
  yield* Effect.forkScoped(worker)
})

await Effect.runPromise(
  Effect.scoped(
    Effect.gen(function*() {
      yield* startWorker
      yield* Effect.sleep("5 millis")
      log.push("main work")
    })
  )
)
check("the worker was stopped when the scope closed", log, ["worker started", "main work", "worker stopped"])
