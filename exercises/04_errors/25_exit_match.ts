/**
 * An Exit is either a success with a value, or a failure with a Cause.
 * Exit.match handles both:
 *
 *   Exit.match(exit, {
 *     onSuccess: (value) => ...,
 *     onFailure: (cause) => ...
 *   })
 *
 * Goal: describe an exit as text.
 */
// I AM NOT DONE
import { Effect, Exit } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const describe = (exit: Exit.Exit<number, string>): string => todo()

check("success", describe(await Effect.runPromiseExit(Effect.succeed(1))), "ok 1")
check("failure", describe(await Effect.runPromiseExit(Effect.fail("x"))), "failed with 1 reason(s)")
