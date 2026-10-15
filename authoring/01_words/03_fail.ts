//#title Failing
//#kind complete
//#teaches Effect.fail
//#hint The value you pass to Effect.fail is the error. The check tells you which string.
//#hint Effect.fail("out of stock")
/**
 * Effect.fail(error) describes a program that stops with a failure.
 * Its type is Effect<never, string> when the error is a string:
 * A is never because it can never succeed, E is string.
 *
 * Running a failing program with runPromise rejects the promise with
 * the error value.
 *
 * Goal: describe a program that fails with "out of stock".
 */
import { Effect } from "effect"

//#solution
const outOfStock: Effect.Effect<never, string> = Effect.fail("out of stock")
//#exercise
const outOfStock: Effect.Effect<never, string> = todo()
//#end

check("the failure value", await rejection(Effect.runPromise(outOfStock)), "out of stock")
