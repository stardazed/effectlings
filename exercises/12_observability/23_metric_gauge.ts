/**
 * Metric.gauge("name") records a value that can rise and fall: queue length,
 * temperature, connections in use. Metric.update SETS it, and Metric.value
 * reads { value }.
 *
 * Goal: set the gauge to 5, then to 3, and read it.
 */
// I AM NOT DONE
import { Effect, Metric } from "effect"

const inFlight = Metric.gauge("in_flight")

const program: Effect.Effect<number> = todo()

check("the latest value", await Effect.runPromise(program), 3)
