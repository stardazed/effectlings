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
// I AM NOT DONE
import { Effect, Fiber, Latch } from "effect"

const log: Array<string> = []

const program: Effect.Effect<string> = todo()

check("result", await Effect.runPromise(program), "done")
check("the runner waited for the gate", log, ["opening gate", "running"])
