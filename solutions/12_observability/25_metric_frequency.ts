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

const program = Effect.gen(function*() {
  yield* Metric.update(statuses, "ok")
  yield* Metric.update(statuses, "ok")
  yield* Metric.update(statuses, "error")
  return Object.fromEntries((yield* Metric.value(statuses)).occurrences)
})

check("counts", await Effect.runPromise(program), { ok: 2, error: 1 })
