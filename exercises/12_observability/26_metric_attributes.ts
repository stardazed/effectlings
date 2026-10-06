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
// I AM NOT DONE
import { Effect, Metric } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const requests = Metric.counter("route_requests")

const forRoute = (route: string): typeof requests => todo()

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
