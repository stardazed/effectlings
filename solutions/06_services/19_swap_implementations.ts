/**
 * This is the payoff of services. `welcome` does not know how mail is
 * delivered. Give it a real layer in production and a recording layer in
 * tests, and nothing in `welcome` changes.
 *
 * Goal: write both layers. The live one answers "delivered to <address>".
 * The test one pushes the address into `outbox` and answers "recorded <address>".
 */
import { Context, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Mailer extends Context.Service<Mailer, {
  readonly send: (to: string) => Effect.Effect<string>
}>()("Mailer") {}

const welcome = Effect.fn("welcome")(function*(name: string) {
  const mailer = yield* Mailer
  return yield* mailer.send(`${name}@example.com`)
})

const outbox: Array<string> = []

const liveLayer: Layer.Layer<Mailer> = Layer.succeed(
  Mailer,
  Mailer.of({ send: (to) => Effect.succeed(`delivered to ${to}`) })
)
const testLayer: Layer.Layer<Mailer> = Layer.succeed(
  Mailer,
  Mailer.of({
    send: (to) =>
      Effect.sync(() => {
        outbox.push(to)
        return `recorded ${to}`
      })
  })
)

check("live", Effect.runSync(welcome("ada").pipe(Effect.provide(liveLayer))), "delivered to ada@example.com")
check("test", Effect.runSync(welcome("ada").pipe(Effect.provide(testLayer))), "recorded ada@example.com")
check("the test layer saw the call", outbox, ["ada@example.com"])
