//#title All three slots
//#kind fix
//#later Context.Service
//#hint Each annotation must describe A, then E, then R. Use never for a slot that is empty.
//#hint fail("x") has A = never and E = string. The mailer program needs Mailer and finishes with a string.
/**
 * Effect<A, E, R>:
 *
 *   Effect.succeed(1)         Effect<number, never, never>   (or Effect<number>)
 *   Effect.fail("x")          Effect<never, string, never>   (or Effect<never, string>)
 *   yield* Mailer inside gen  R gains Mailer
 *
 * Trailing slots that are `never` may be left out.
 *
 * Goal: fix the three annotations.
 */
import { Context, Effect } from "effect"
import { check } from "../../src/check.ts"

// Scaffolding, do not edit.
class Mailer extends Context.Service<Mailer, {
  readonly send: (to: string) => Effect.Effect<void>
}>()("Mailer") {}

//#solution
const one: Effect.Effect<number> = Effect.succeed(1)
const nope: Effect.Effect<never, string> = Effect.fail("x")
const notify: Effect.Effect<string, never, Mailer> = Effect.gen(function*() {
  const mailer = yield* Mailer
  yield* mailer.send("ada@example.com")
  return "sent"
})
//#exercise
const one: Effect.Effect<string> = Effect.succeed(1)
const nope: Effect.Effect<never> = Effect.fail("x")
const notify: Effect.Effect<string> = Effect.gen(function*() {
  const mailer = yield* Mailer
  yield* mailer.send("ada@example.com")
  return "sent"
})
//#end

check("one", Effect.runSync(one), 1)
check("nope and notify are values", [typeof nope, typeof notify], ["object", "object"])
