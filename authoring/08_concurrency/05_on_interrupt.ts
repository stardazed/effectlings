//#title Cleaning up when interrupted
//#kind complete
//#teaches Effect.onInterrupt
//#hint onInterrupt takes a function returning the cleanup Effect. It runs only on interruption.
//#hint Effect.never.pipe(Effect.onInterrupt(() => Effect.sync(() => { log.push("cleanup") })))
/**
 * Effect.onInterrupt(cleanup) runs `cleanup` if the program is interrupted.
 * (For cleanup that must run on every ending, use Effect.ensuring or a scope.)
 *
 * Goal: an endless task that logs "cleanup" when it is interrupted.
 */
import { Effect, Fiber } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []

//#solution
const cancellable: Effect.Effect<never> = Effect.never.pipe(
  Effect.onInterrupt(() => Effect.sync(() => { log.push("cleanup") }))
)
//#exercise
const cancellable: Effect.Effect<never> = todo()
//#end

await Effect.runPromise(
  Effect.gen(function*() {
    const fiber = yield* Effect.forkChild(cancellable)
    yield* Effect.yieldNow
    check("nothing yet", log, [])
    yield* Fiber.interrupt(fiber)
  })
)
check("cleanup ran on interrupt", log, ["cleanup"])
