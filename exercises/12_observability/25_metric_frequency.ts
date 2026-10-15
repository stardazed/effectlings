/**
 * Metric.frequency("name") counts occurrences of each distinct string:
 * HTTP statuses, error kinds, user agents. Its state has `occurrences`,
 * a Map from value to count.
 *
 * Goal: record "ok", "ok", "error" and return the counts as a plain object.
 */
// I AM NOT DONE
import { Effect, Metric } from "effect"

const statuses = Metric.frequency("statuses")

const program: Effect.Effect<Record<string, number>> = todo()

check("counts", await Effect.runPromise(program), { ok: 2, error: 1 })
