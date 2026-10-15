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
// I AM NOT DONE
import { Effect } from "effect"

const outOfStock: Effect.Effect<never, string> = todo()

check("the failure value", await rejection(Effect.runPromise(outOfStock)), "out of stock")
