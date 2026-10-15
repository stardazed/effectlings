/**
 * Every Effect has a type with three slots: Effect<A, E, R>.
 *
 *   A   what it produces when it succeeds
 *   E   how it can fail        (never = it cannot fail)
 *   R   what it needs to run   (never = it needs nothing)
 *
 * Effect.Effect<string> is short for Effect.Effect<string, never, never>.
 * For now we only care about A. Errors and requirements come later.
 *
 * Goal: fix the three annotations so they describe what the programs produce.
 */
import { Effect } from "effect"

const greeting: Effect.Effect<string> = Effect.succeed("hello")
const count: Effect.Effect<number> = Effect.succeed(3)
const epoch: Effect.Effect<Date> = Effect.sync(() => new Date(0))

check("greeting", Effect.runSync(greeting), "hello")
check("count", Effect.runSync(count), 3)
check("epoch", Effect.runSync(epoch).getTime(), 0)
