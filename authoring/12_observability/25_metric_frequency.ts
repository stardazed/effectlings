//#title Counting categories
//#kind complete
//#teaches Metric.frequency
//#hint A frequency counts how many times each text value was recorded.
//#hint yield* Metric.update(statuses, "ok"); then Object.fromEntries((yield* Metric.value(statuses)).occurrences)
/**
 * Metric.frequency("name") counts occurrences of each distinct string:
 * HTTP statuses, error kinds, user agents. Its state has `occurrences`,
 * a Map from value to count.
 *
 * Goal: record "ok", "ok", "error" and return the counts as a plain object.
 */
import { Effect, Metric } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const statuses = Metric.frequency("statuses")

//#solution
const program = Effect.gen(function*() {
  yield* Metric.update(statuses, "ok")
  yield* Metric.update(statuses, "ok")
  yield* Metric.update(statuses, "error")
  return Object.fromEntries((yield* Metric.value(statuses)).occurrences)
})
//#exercise
const program: Effect.Effect<Record<string, number>> = todo()
//#end

check("counts", await Effect.runPromise(program), { ok: 2, error: 1 })
