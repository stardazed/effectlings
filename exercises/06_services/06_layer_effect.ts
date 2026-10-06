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
// I AM NOT DONE
import { Context, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Counter extends Context.Service<Counter, {
  readonly next: () => number
}>()("Counter") {}

const counterLayer: Layer.Layer<Counter> = todo()

const threeIds = Effect.gen(function*() {
  const counter = yield* Counter
  return [counter.next(), counter.next(), counter.next()]
}).pipe(Effect.provide(counterLayer))

check("first run", Effect.runSync(threeIds), [1, 2, 3])
check("a new provide builds a new counter", Effect.runSync(threeIds), [1, 2, 3])
