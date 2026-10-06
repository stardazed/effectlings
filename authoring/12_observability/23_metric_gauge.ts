//#title Values that go up and down
//#kind complete
//#teaches Metric.gauge
//#hint A gauge holds the latest value you set, like a speedometer. update replaces it.
//#hint yield* Metric.update(inFlight, 5); yield* Metric.update(inFlight, 3)
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

//#solution
const program = Effect.gen(function*() {
  yield* Metric.update(inFlight, 5)
  yield* Metric.update(inFlight, 3)
  return (yield* Metric.value(inFlight)).value
})
//#exercise
const program: Effect.Effect<number> = todo()
//#end

check("the latest value", await Effect.runPromise(program), 3)
