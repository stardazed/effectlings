/**
 * Layer.succeed needs the implementation up front. When building the
 * service takes work (setup, reading other services, opening a connection),
 * use Layer.effect. It takes an Effect that produces the implementation:
 *
 *   Layer.effect(Service, Effect.sync(() => Service.of({ ... })))
 *
 * The setup runs when the layer is built, not every time the service is used.
 * Here that means every program that provides the layer gets its own private `n`.
 *
 * Goal: a Counter whose next() returns 1, 2, 3, ...
 */
import { Context, Effect, Layer } from "effect"

class Counter extends Context.Service<Counter, {
  readonly next: () => number
}>()("Counter") {}

const counterLayer: Layer.Layer<Counter> = Layer.effect(
  Counter,
  Effect.sync(() => {
    let n = 0
    return Counter.of({ next: () => ++n })
  })
)

const threeIds = Effect.gen(function*() {
  const counter = yield* Counter
  return [counter.next(), counter.next(), counter.next()]
}).pipe(Effect.provide(counterLayer))

check("first run", Effect.runSync(threeIds), [1, 2, 3])
check("a new provide builds a new counter", Effect.runSync(threeIds), [1, 2, 3])
