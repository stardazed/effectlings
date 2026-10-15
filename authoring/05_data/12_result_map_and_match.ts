//#title Transforming and reading a Result
//#kind complete
//#teaches Result.map, Result.match
//#hint Result has .pipe too. map changes the success value only.
//#hint r.pipe(Result.map((n) => n * 2)) and r.pipe(Result.match({ onFailure: ..., onSuccess: ... }))
/**
 *   result.pipe(Result.map(f))                       change the success value
 *   result.pipe(Result.match({ onFailure, onSuccess })) leave the Result
 *
 * Failures pass through map untouched.
 *
 * Goal: double the success value, and describe a Result as text.
 */
import { Result } from "effect"

//#solution
const doubled = (r: Result.Result<number, string>): Result.Result<number, string> => r.pipe(Result.map((n) => n * 2))
const describe = (r: Result.Result<number, string>): string =>
  r.pipe(Result.match({ onFailure: (e) => `error: ${e}`, onSuccess: (n) => `value: ${n}` }))
//#exercise
const doubled = (r: Result.Result<number, string>): Result.Result<number, string> => todo()
const describe = (r: Result.Result<number, string>): string => todo()
//#end

check("doubled success", doubled(Result.succeed(4)), Result.succeed(8))
check("doubled failure", doubled(Result.fail("no")), Result.fail("no"))
check("describe success", describe(Result.succeed(4)), "value: 4")
check("describe failure", describe(Result.fail("no")), "error: no")
