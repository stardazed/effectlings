/**
 *   Effect.fromResult(result)    a program that succeeds or fails like the Result
 *   Effect.result(program)       a Result-valued program that never fails
 *
 * They are inverses. This is how synchronous validation code plugs into
 * larger Effect programs.
 *
 * Goal: lift parse into an Effect, and capture an Effect's outcome as a Result.
 */
import { Effect, Result } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const parse = (s: string): Result.Result<number, string> =>
  s !== "" && Number.isInteger(Number(s)) ? Result.succeed(Number(s)) : Result.fail("not a number")

const parseEffect = (s: string): Effect.Effect<number, string> => Effect.fromResult(parse(s))
const outcome = (program: Effect.Effect<number, string>): Effect.Effect<Result.Result<number, string>> =>
  Effect.result(program)

check("lifted success", Effect.runSync(parseEffect("5")), 5)
check("lifted failure", Effect.runSync(outcome(parseEffect("x"))), Result.fail("not a number"))
check("captured success", Effect.runSync(outcome(Effect.succeed(1))), Result.succeed(1))
