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
// I AM NOT DONE
import { Effect, Metric } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const requests = Metric.counter("requests")

const program: Effect.Effect<number> = todo()

check("total", await Effect.runPromise(program), 5)
