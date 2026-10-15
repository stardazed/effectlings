//#title Protecting a critical section
//#kind fix
//#teaches Effect.uninterruptible
//#hint The job is cut short by the interrupt. Mark it so interruption waits for it.
//#hint Effect.uninterruptible(...) wraps an effect and returns an effect.
/**
 * Sometimes a step must finish once started, such as a write that would
 * otherwise be left half done. Effect.uninterruptible(program) makes a
 * program immune to interruption. Interrupting the fiber then waits until
 * that region is complete.
 *
 * Use it sparingly and keep the protected part small.
 *
 * Goal: the job below must always finish. Fix `task`.
 */
import { Effect, Fiber } from "effect"

const log: Array<string> = []
const job = Effect.sleep("10 millis").pipe(Effect.tap(() => Effect.sync(() => { log.push("finished") })))

//#solution
const task = Effect.uninterruptible(job)
//#exercise
const task = job
//#end

await Effect.runPromise(
  Effect.gen(function*() {
    const fiber = yield* Effect.forkChild(task)
    yield* Effect.yieldNow
    yield* Fiber.interrupt(fiber)
  })
)
check("the job finished despite the interrupt", log, ["finished"])
