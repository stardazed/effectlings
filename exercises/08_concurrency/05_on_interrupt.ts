/**
 * Effect.onInterrupt(cleanup) runs `cleanup` if the program is interrupted.
 * (For cleanup that must run on every ending, use Effect.ensuring or a scope.)
 *
 * Goal: an endless task that logs "cleanup" when it is interrupted.
 */
// I AM NOT DONE
import { Effect, Fiber } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []

const cancellable: Effect.Effect<never> = todo()

await Effect.runPromise(
  Effect.gen(function*() {
    const fiber = yield* Effect.forkChild(cancellable)
    yield* Effect.yieldNow
    check("nothing yet", log, [])
    yield* Fiber.interrupt(fiber)
  })
)
check("cleanup ran on interrupt", log, ["cleanup"])
