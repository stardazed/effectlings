//#title Labelling metrics
//#kind complete
//#teaches Metric.withAttributes
//#hint withAttributes returns a new metric that records under those labels.
//#hint Metric.withAttributes(requests, { route: "/users" })
/**
 * One counter often needs breaking down: requests per route. Instead of
 * making a counter per route, attach attributes:
 *
 *   Metric.withAttributes(requests, { route: "/users" })
 *
 * The result is a metric that updates the same counter name but under the
 * labelled series. Different attributes are tracked separately.
 *
 * Goal: a counter per route.
 */
import { Effect, Metric } from "effect"

const requests = Metric.counter("route_requests")

//#solution
const forRoute = (route: string) => Metric.withAttributes(requests, { route })
//#exercise
const forRoute = (route: string): typeof requests => todo()
//#end

const program = Effect.gen(function*() {
  yield* Metric.update(forRoute("/users"), 1)
  yield* Metric.update(forRoute("/users"), 1)
  yield* Metric.update(forRoute("/orders"), 1)
  return [
    (yield* Metric.value(forRoute("/users"))).count,
    (yield* Metric.value(forRoute("/orders"))).count
  ]
})

check("counts per route", await Effect.runPromise(program), [2, 1])
