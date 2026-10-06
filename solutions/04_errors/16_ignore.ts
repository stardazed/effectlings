/**
 * Effect.ignore discards the result and any failure, and finishes with
 * void. Use it for best-effort work that must not stop the main job, such
 * as sending metrics.
 *
 * Goal: attempt sendMetrics, then finish with "done" even though it fails.
 * (Defects are not ignored. Only expected failures are.)
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let attempts = 0
const sendMetrics: Effect.Effect<void, string> = Effect.suspend(() => {
  attempts += 1
  return Effect.fail("metrics offline")
})

const main: Effect.Effect<string> = Effect.gen(function*() {
  yield* sendMetrics.pipe(Effect.ignore)
  return "done"
})

check("result", await Effect.runPromise(main), "done")
check("the metrics were attempted", attempts, 1)
