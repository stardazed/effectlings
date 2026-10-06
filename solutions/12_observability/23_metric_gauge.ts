/**
 * Metric.gauge("name") records a value that can rise and fall: queue length,
 * temperature, connections in use. Metric.update SETS it, and Metric.value
 * reads { value }.
 *
 * Goal: set the gauge to 5, then to 3, and read it.
 */
import { Effect, Metric } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const inFlight = Metric.gauge("in_flight")

const program = Effect.gen(function*() {
  yield* Metric.update(inFlight, 5)
  yield* Metric.update(inFlight, 3)
  return (yield* Metric.value(inFlight)).value
})

check("the latest value", await Effect.runPromise(program), 3)
