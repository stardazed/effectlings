//#title Giving up on an error with orDie
//#kind complete
//#teaches Effect.orDie
//#hint orDie removes the error from the type. The error becomes a crash.
//#hint parse(s).pipe(Effect.orDie)
/**
 * Sometimes an error is a bug you do not intend to handle. Effect.orDie
 * turns a failure into a "defect": it removes E from the type (E becomes
 * never) and the program crashes if that failure happens.
 *
 * Defects and how to inspect them get a full treatment in the errors
 * chapter. For now: orDie means "this cannot happen, and if it does, stop".
 *
 * Goal: write `strict` so it cannot fail in its type.
 */
import { Effect, Exit } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"
import type { Equal, Expect } from "../../src/types.ts"

const parse = (s: string): Effect.Effect<number, string> =>
  Number.isNaN(Number(s)) ? Effect.fail("not a number") : Effect.succeed(Number(s))

//#solution
const strict = (s: string) => parse(s).pipe(Effect.orDie)
//#exercise
const strict = (s: string): Effect.Effect<number> => todo()
//#end

export type Test = Expect<Equal<Effect.Error<ReturnType<typeof strict>>, never>>

check("good input", Effect.runSync(strict("4")), 4)
check("bad input crashes", Exit.isFailure(await Effect.runPromiseExit(strict("x"))), true)
