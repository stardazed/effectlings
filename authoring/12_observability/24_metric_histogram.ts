//#title Distributions
//#kind complete
//#teaches Metric.histogram, Metric.linearBoundaries
//#hint Update the histogram with each latency. The state has count, sum, min and max.
//#hint yield* Metric.update(latency, 12); ...; const state = yield* Metric.value(latency); return { count: state.count, sum: state.sum, min: state.min, max: state.max }
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
import { Effect, Metric } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const latency = Metric.histogram("latency", {
  boundaries: Metric.linearBoundaries({ start: 0, width: 10, count: 6 })
})

//#solution
const program = Effect.gen(function*() {
  yield* Metric.update(latency, 12)
  yield* Metric.update(latency, 48)
  yield* Metric.update(latency, 7)
  const state = yield* Metric.value(latency)
  return { count: state.count, sum: state.sum, min: state.min, max: state.max }
})
//#exercise
const program: Effect.Effect<{ count: number; sum: number; min: number; max: number }> = todo()
//#end

check("summary", await Effect.runPromise(program), { count: 3, sum: 67, min: 7, max: 48 })
