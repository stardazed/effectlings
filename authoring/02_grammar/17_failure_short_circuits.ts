//#title A failure stops the program
//#kind complete
//#deepens Effect.gen, yield*, Effect.fail, Effect.runPromiseExit, Exit.isFailure
//#hint Follow the generator from the top. What happens at the line that fails?
//#hint Steps after a failing yield* never run.
/**
 * When a yielded effect fails, the generator stops right there and the
 * whole program fails. Later steps never run.
 *
 * Predict the future: what will `log` contain after the program is run?
 * Write your prediction in `expectedLog`, then confirm it by running.
 */
import { Effect, Exit } from "effect"

const log: Array<string> = []
const step = (name: string) => Effect.sync(() => { log.push(name) })

const program = Effect.gen(function*() {
  yield* step("a")
  yield* step("b")
  yield* Effect.fail("stop")
  yield* step("c")
})

const exit = await Effect.runPromiseExit(program)

//#solution
const expectedLog: Array<string> = ["a", "b"]
//#exercise
const expectedLog: Array<string> = todo()
//#end

check("the program failed", Exit.isFailure(exit), true)
check("what ran", log, expectedLog)
