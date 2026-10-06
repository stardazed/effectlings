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
import { Effect, Fiber } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const slowDouble = (n: number) => Effect.sleep("5 millis").pipe(Effect.as(n * 2))

const program = Effect.gen(function*() {
  const fiber = yield* Effect.forkChild(slowDouble(21))
  const other = yield* Effect.succeed(1)
  const doubled = yield* Fiber.join(fiber)
  return doubled + other
})

check("result", await Effect.runPromise(program), 43)
