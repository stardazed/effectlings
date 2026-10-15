//#title Counting things
//#kind complete
//#teaches Metric.counter, Metric.update, Metric.value
//#hint Define the counter once, at the top level. update adds to it. value reads its state.
//#hint const requests = Metric.counter("requests"); yield* Metric.update(requests, 1)
/**
 * Logs tell you what happened. Metrics tell you how much, over time.
 *
 *   Metric.counter("requests")      a number that only goes up
 *   Metric.update(metric, amount)   record a measurement (an Effect)
 *   Metric.value(metric)            read the current state (an Effect)
 *
 * A metric is created once, as a plain value, and used from anywhere.
 * A counter's state is { count, incremental }.
 *
 * Goal: count three requests, adding 1, 1 and 3, then read the total.
 */
import { Effect, Metric } from "effect"

const requests = Metric.counter("requests")

//#solution
const program: Effect.Effect<number> = Effect.gen(function*() {
  yield* Metric.update(requests, 1)
  yield* Metric.update(requests, 1)
  yield* Metric.update(requests, 3)
  return (yield* Metric.value(requests)).count
})
//#exercise
const program: Effect.Effect<number> = todo()
//#end

check("total", await Effect.runPromise(program), 5)
