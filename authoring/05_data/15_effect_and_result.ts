//#title Moving between Result and Effect
//#kind complete
//#teaches Effect.fromResult
//#deepens Effect.result
//#hint fromResult lifts a Result into an Effect. Effect.result goes the other way.
//#hint Effect.fromResult(parse(s)) and Effect.result(program)
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

const parse = (s: string): Result.Result<number, string> =>
  s !== "" && Number.isInteger(Number(s)) ? Result.succeed(Number(s)) : Result.fail("not a number")

//#solution
const parseEffect = (s: string): Effect.Effect<number, string> => Effect.fromResult(parse(s))
const outcome = (program: Effect.Effect<number, string>): Effect.Effect<Result.Result<number, string>> =>
  Effect.result(program)
//#exercise
const parseEffect = (s: string): Effect.Effect<number, string> => todo()
const outcome = (program: Effect.Effect<number, string>): Effect.Effect<Result.Result<number, string>> => todo()
//#end

check("lifted success", Effect.runSync(parseEffect("5")), 5)
check("lifted failure", Effect.runSync(outcome(parseEffect("x"))), Result.fail("not a number"))
check("captured success", Effect.runSync(outcome(Effect.succeed(1))), Result.succeed(1))
