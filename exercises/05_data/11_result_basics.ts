/**
 * Result<A, E> is a plain value that holds either a success or a failure.
 * It is Effect's Exit without any running involved: no waiting, no
 * requirements, just data.
 *
 *   Result.succeed(2)      a success holding 2
 *   Result.fail("no")      a failure holding "no"
 *
 * Use Result for synchronous code that can fail, and Effect when the code
 * needs to run, wait, or use services.
 *
 * Goal: write divide.
 */
// I AM NOT DONE
import { Result } from "effect"

const divide = (a: number, b: number): Result.Result<number, string> => todo()

check("ok", divide(6, 3), Result.succeed(2))
check("division by zero", divide(1, 0), Result.fail("divide by zero"))
check("isSuccess", Result.isSuccess(divide(6, 3)), true)
check("isFailure", Result.isFailure(divide(1, 0)), true)
