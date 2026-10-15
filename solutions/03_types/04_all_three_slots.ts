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

// Scaffolding, do not edit.
class Mailer extends Context.Service<Mailer, {
  readonly send: (to: string) => Effect.Effect<void>
}>()("Mailer") {}

const one: Effect.Effect<number> = Effect.succeed(1)
const nope: Effect.Effect<never, string> = Effect.fail("x")
const notify: Effect.Effect<string, never, Mailer> = Effect.gen(function*() {
  const mailer = yield* Mailer
  yield* mailer.send("ada@example.com")
  return "sent"
})

check("one", Effect.runSync(one), 1)
check("nope and notify are values", [typeof nope, typeof notify], ["object", "object"])
