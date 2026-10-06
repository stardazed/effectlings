/**
 * A fiber is a lightweight thread of execution managed by Effect.
 *
 *   Effect.forkChild(program)   start program in the background; returns a Fiber at once
 *   Fiber.join(fiber)           wait for the fiber to finish and get its result
 *
 * Forking does not wait. You can do other work, then join.
 *
 * Goal: start slowDouble(21) in the background, compute `other` (1) in the meantime,
 * then join the fiber and return the two added together.
 */
// I AM NOT DONE
import { Effect, Fiber } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const slowDouble = (n: number) => Effect.sleep("5 millis").pipe(Effect.as(n * 2))

const program: Effect.Effect<number> = todo()

check("result", await Effect.runPromise(program), 43)
