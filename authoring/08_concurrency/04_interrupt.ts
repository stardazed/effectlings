//#title Stopping a fiber
//#kind complete
//#teaches Fiber.interrupt, Effect.never, Effect.yieldNow, Cause.hasInterrupts
//#hint Fork Effect.never, let it start with Effect.yieldNow, interrupt it, then await its Exit.
//#hint const fiber = yield* Effect.forkChild(Effect.never); yield* Effect.yieldNow; yield* Fiber.interrupt(fiber); return yield* Fiber.await(fiber)
/**
 * Fibers can be cancelled from outside.
 *
 *   Effect.never          a program that never finishes
 *   Effect.yieldNow       let other fibers run (so the child gets to start)
 *   Fiber.interrupt(f)    stop the fiber and wait until it has stopped
 *
 * An interrupted fiber ends with a third kind of outcome, besides failure and
 * defect: interruption. Cause.hasInterrupts(cause) recognizes it.
 *
 * Goal: start an endless task, interrupt it, and return its Exit.
 */
import { Cause, Effect, Exit, Fiber } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const program = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(Effect.never)
  yield* Effect.yieldNow
  yield* Fiber.interrupt(fiber)
  return yield* Fiber.await(fiber)
})
//#exercise
const program: Effect.Effect<Exit.Exit<never>> = todo()
//#end

const exit = await Effect.runPromise(program)
check("ended in failure", Exit.isFailure(exit), true)
check("because it was interrupted", Exit.isFailure(exit) && Cause.hasInterrupts(exit.cause), true)
