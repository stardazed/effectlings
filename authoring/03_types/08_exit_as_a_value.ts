//#title Turning failure into a value with exit
//#kind complete
//#teaches Effect.exit
//#hint Effect.exit(program) wraps the outcome, so the new program cannot fail.
//#hint Effect.exit(risky)
/**
 * Effect.exit(program) is a program that always succeeds. Its result is
 * the Exit of the original: failure is now data instead of a channel.
 *
 *   Effect<A, E, R>   becomes   Effect<Exit<A, E>, never, R>
 *
 * Goal: capture the outcome of `risky` and inspect it.
 */
import { Effect, Exit } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const risky: Effect.Effect<number, string> = Effect.fail("boom")

//#solution
const attempt: Effect.Effect<Exit.Exit<number, string>> = Effect.exit(risky)
//#exercise
const attempt: Effect.Effect<Exit.Exit<number, string>> = todo()
//#end

const outcome = Effect.runSync(attempt)
check("the failure is data now", Exit.isFailure(outcome), true)
check("a success is data too", Exit.isSuccess(Effect.runSync(Effect.exit(Effect.succeed(1)))), true)
