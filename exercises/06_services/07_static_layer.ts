/**
 * By convention, the main layer of a service is a static property called
 * `layer`, written inside the class. Other variants get descriptive names
 * such as `layerTest`. Then wiring code always reads Mailer.layer.
 *
 * Goal: give Mailer its layer. send(to) finishes with "sent to <to>".
 */
// I AM NOT DONE
import { Context, Effect, Layer } from "effect"

class Mailer extends Context.Service<Mailer, {
  readonly send: (to: string) => Effect.Effect<string>
}>()("Mailer") {
  static readonly layer: Layer.Layer<Mailer> = todo()
}

const program = Mailer.use((mailer) => mailer.send("ada@example.com")).pipe(Effect.provide(Mailer.layer))

check("result", Effect.runSync(program), "sent to ada@example.com")
