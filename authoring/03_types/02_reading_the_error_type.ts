//#title Reading the error type
//#kind fix
//#teaches Effect.Error
//#hint Find the line that fails. What type does its argument have?
//#hint Change `Failure` to string.
/**
 * The E slot lists everything that can go wrong, as a type:
 *
 *   Effect.Error<typeof program>
 *
 * A program that cannot fail has E = never.
 *
 * Goal: fix `Failure` so it matches the program.
 */
import { Effect, Exit } from "effect"
import { check } from "../../src/check.ts"
import type { Equal, Expect } from "../../src/types.ts"

const program = Effect.gen(function*() {
  const n = yield* Effect.succeed(1)
  if (n > 0) return yield* Effect.fail("too big")
  return n
})

//#solution
type Failure = string
//#exercise
type Failure = never
//#end

export type Test = Expect<Equal<Effect.Error<typeof program>, Failure>>

check("it fails", Exit.isFailure(await Effect.runPromiseExit(program)), true)
