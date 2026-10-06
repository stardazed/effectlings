//#title Exit: success or failure as a value
//#kind complete
//#teaches Effect.runPromiseExit, Exit.Exit, Exit.isSuccess, Exit.isFailure
//#hint runPromiseExit never rejects. Await it to get an Exit value.
//#hint Exit.isSuccess(exit) and Exit.isFailure(exit) answer yes or no.
/**
 * runPromise turns a failure into a rejected promise. Often you would
 * rather get a plain value that says what happened.
 *
 *   Effect.runPromiseExit(prog)   Promise of an Exit, never rejects
 *   Exit.isSuccess(exit)          true when the program succeeded
 *   Exit.isFailure(exit)          true when it failed
 *
 * Goal: run both programs and keep their Exit values.
 */
import { Effect, Exit } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const good = Effect.succeed(1)
const bad = Effect.fail("no")

//#solution
const goodExit: Exit.Exit<number> = await Effect.runPromiseExit(good)
const badExit: Exit.Exit<never, string> = await Effect.runPromiseExit(bad)
//#exercise
const goodExit: Exit.Exit<number> = todo()
const badExit: Exit.Exit<never, string> = todo()
//#end

check("good succeeded", Exit.isSuccess(goodExit), true)
check("good did not fail", Exit.isFailure(goodExit), false)
check("bad failed", Exit.isFailure(badExit), true)
check("bad did not succeed", Exit.isSuccess(badExit), false)
