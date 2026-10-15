/**
 * An average hides the slow outliers. A histogram sorts measurements into
 * buckets so you can see the shape:
 *
 *   Metric.histogram("latency", { boundaries: Metric.linearBoundaries({ start, width, count }) })
 *
 * Its state has { count, sum, min, max, buckets }.
 *
 * Goal: record the latencies 12, 48 and 7 and summarize them.
 */
// I AM NOT DONE
import { Effect, Metric } from "effect"

const latency = Metric.histogram("latency", {
  boundaries: Metric.linearBoundaries({ start: 0, width: 10, count: 6 })
})

const program: Effect.Effect<{ count: number; sum: number; min: number; max: number }> = todo()

check("summary", await Effect.runPromise(program), { count: 3, sum: 67, min: 7, max: 48 })
