/**
 * When a yielded effect fails, the generator stops right there and the
 * whole program fails. Later steps never run.
 *
 * Predict the future: what will `log` contain after the program is run?
 * Write your prediction in `expectedLog`, then confirm it by running.
 */
import { Effect, Exit } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []
const step = (name: string) => Effect.sync(() => { log.push(name) })

const program = Effect.gen(function*() {
  yield* step("a")
  yield* step("b")
  yield* Effect.fail("stop")
  yield* step("c")
})

const exit = await Effect.runPromiseExit(program)

const expectedLog: Array<string> = ["a", "b"]

check("the program failed", Exit.isFailure(exit), true)
check("what ran", log, expectedLog)
