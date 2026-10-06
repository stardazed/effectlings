/**
 * The most common mistake with generators: naming an effect instead of
 * running it. `const a = getA` gives you the program, not its result.
 * The type checker will catch it as soon as you use the value.
 *
 * Goal: fix the generator so it produces 5.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"

const getA = Effect.succeed(2)
const getB = Effect.succeed(3)

const program = Effect.gen(function*() {
  const a = yield* getA
  const b = yield* getB
  return a + b
})

check("sum", Effect.runSync(program), 5)
