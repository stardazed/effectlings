/**
 * You can only run a program whose R is never. To satisfy a requirement,
 * hand over an implementation:
 *
 *   program.pipe(Effect.provideService(Mailer, { send: ... }))
 *
 * The result no longer needs Mailer.
 *
 * Goal: fix the error on the last line by providing Mailer. Record the
 * address in `sent`.
 */
// I AM NOT DONE
import { Context, Effect } from "effect"
import { check } from "../../src/check.ts"

// Scaffolding, do not edit.
class Mailer extends Context.Service<Mailer, {
  readonly send: (to: string) => Effect.Effect<void>
}>()("Mailer") {}

const sent: Array<string> = []

const program = Effect.gen(function*() {
  const mailer = yield* Mailer
  yield* mailer.send("ada@example.com")
  return "sent"
})

const result = Effect.runSync(program)

check("result", result, "sent")
check("sent", sent, ["ada@example.com"])
