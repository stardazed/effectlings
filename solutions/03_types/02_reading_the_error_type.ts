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

const program = Effect.gen(function*() {
  const age = yield* Effect.succeed(15)
  if (age >= 18) return age
  return yield* Effect.fail("too young")
})

type Failure = string

export type Test = Expect<Equal<Effect.Error<typeof program>, Failure>>

check("it fails", Exit.isFailure(await Effect.runPromiseExit(program)), true)
