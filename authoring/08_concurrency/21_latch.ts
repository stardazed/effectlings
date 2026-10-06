//#title A gate that opens
//#kind complete
//#teaches Latch.make, Latch.open, Latch.await
//#hint A Latch starts closed when you pass false. Fibers that await it wait until it is opened.
//#hint const gate = yield* Latch.make(false); ...Latch.await(gate)...; yield* Latch.open(gate)
/**
 * A Latch is a gate. Unlike a Deferred it carries no value, it only says
 * "now you may go", and it can release any number of waiters.
 *
 *   Latch.make(false)    a closed gate
 *   Latch.await(gate)    wait until it is open
 *   Latch.open(gate)     open it
 *
 * Goal: a runner waits at the gate and logs "running" once it opens.
 * The main fiber logs "opening gate", opens it, and joins the runner.
 */
import { Effect, Fiber, Latch } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []

//#solution
const program = Effect.gen(function*() {
  const gate = yield* Latch.make(false)
  const runner = yield* Effect.forkChild(
    Effect.gen(function*() {
      yield* Latch.await(gate)
      log.push("running")
      return "done"
    })
  )
  yield* Effect.sleep("5 millis")
  log.push("opening gate")
  yield* Latch.open(gate)
  return yield* Fiber.join(runner)
})
//#exercise
const program: Effect.Effect<string> = todo()
//#end

check("result", await Effect.runPromise(program), "done")
check("the runner waited for the gate", log, ["opening gate", "running"])
