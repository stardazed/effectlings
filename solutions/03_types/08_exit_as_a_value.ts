/**
 * Effect.exit(program) is a program that always succeeds. Its result is
 * the Exit of the original: failure is now data instead of a channel.
 *
 *   Effect<A, E, R>   becomes   Effect<Exit<A, E>, never, R>
 *
 * Goal: capture the outcome of `risky` and inspect it.
 */
import { Effect, Exit } from "effect"

const risky: Effect.Effect<number, string> = Effect.fail("boom")

const attempt: Effect.Effect<Exit.Exit<number, string>> = Effect.exit(risky)

const outcome = Effect.runSync(attempt)
check("the failure is data now", Exit.isFailure(outcome), true)
check("a success is data too", Exit.isSuccess(Effect.runSync(Effect.exit(Effect.succeed(1)))), true)
