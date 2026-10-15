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
import { Context, Effect } from "effect"

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

const runnable = program.pipe(
  Effect.provideService(Mailer, {
    send: (to) => Effect.sync(() => { sent.push(to) })
  })
)
const result = Effect.runSync(runnable)

check("result", result, "sent")
check("sent", sent, ["ada@example.com"])
