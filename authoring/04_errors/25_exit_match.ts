//#title Reading an Exit
//#kind complete
//#teaches Exit.match
//#hint Exit.match takes the exit, then an object with onSuccess and onFailure.
//#hint onFailure receives the Cause. Its reasons are in cause.reasons.
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
import { Effect, Exit } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const describe = (exit: Exit.Exit<number, string>): string =>
  Exit.match(exit, {
    onSuccess: (n) => `ok ${n}`,
    onFailure: (cause) => `failed with ${cause.reasons.length} reason(s)`
  })
//#exercise
const describe = (exit: Exit.Exit<number, string>): string => todo()
//#end

check("success", describe(await Effect.runPromiseExit(Effect.succeed(1))), "ok 1")
check("failure", describe(await Effect.runPromiseExit(Effect.fail("x"))), "failed with 1 reason(s)")
