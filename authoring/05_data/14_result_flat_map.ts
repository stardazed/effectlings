//#title Chaining fallible steps
//#kind complete
//#teaches Result.flatMap
//#hint Each step returns a Result, so chain them with flatMap.
//#hint parse(s).pipe(Result.flatMap(...), Result.flatMap(...))
/**
 * Result.flatMap(f) continues with another Result-returning step. The
 * first failure ends the chain and is what you get back.
 *
 * Goal: accept a string only if it is a number, positive, and even.
 */
import { Result } from "effect"

const parse = (s: string): Result.Result<number, string> =>
  s !== "" && Number.isInteger(Number(s)) ? Result.succeed(Number(s)) : Result.fail("not a number")
const positive = (n: number): Result.Result<number, string> => (n > 0 ? Result.succeed(n) : Result.fail("not positive"))
const even = (n: number): Result.Result<number, string> => (n % 2 === 0 ? Result.succeed(n) : Result.fail("not even"))

//#solution
const validate = (s: string): Result.Result<number, string> =>
  parse(s).pipe(Result.flatMap(positive), Result.flatMap(even))
//#exercise
const validate = (s: string): Result.Result<number, string> => todo()
//#end

check("valid", validate("8"), Result.succeed(8))
check("not a number", validate("x"), Result.fail("not a number"))
check("not positive", validate("-4"), Result.fail("not positive"))
check("not even", validate("7"), Result.fail("not even"))
