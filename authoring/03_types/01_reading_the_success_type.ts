//#title Reading the success type
//#kind fix
//#teaches Effect.Success
//#hint Look at what the generator returns. It is a template string.
//#hint Change `Answer` to string.
/**
 * TypeScript infers the three slots of an Effect for you. You can pull
 * each one out as a type:
 *
 *   Effect.Success<typeof program>    the A slot
 *
 * `Expect<Equal<X, Y>>` (from src/types.ts) compiles only when the types
 * X and Y are identical. It is how these exercises check types.
 *
 * Goal: make the type error go away by fixing `Answer`.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import type { Equal, Expect } from "../../src/types.ts"

const program = Effect.gen(function*() {
  const n = yield* Effect.succeed(2)
  return `n=${n}`
})

//#solution
type Answer = string
//#exercise
type Answer = number
//#end

export type Test = Expect<Equal<Effect.Success<typeof program>, Answer>>

check("it runs", Effect.runSync(program), "n=2")
