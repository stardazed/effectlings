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
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const outOfStock: Effect.Effect<never, string> = Effect.fail("out of stock")

check("the failure value", await rejection(Effect.runPromise(outOfStock)), "out of stock")
