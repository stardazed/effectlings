//#title Best effort with ignore
//#kind complete
//#teaches Effect.ignore
//#hint Effect.ignore is a value you pass to pipe, not a function you call.
//#hint sendMetrics.pipe(Effect.ignore)
/**
 * Effect.ignore discards the result and any failure, and finishes with
 * void. Use it for best-effort work that must not stop the main job, such
 * as sending metrics.
 *
 * Goal: attempt sendMetrics, then finish with "done" even though it fails.
 * (Defects are not ignored. Only expected failures are.)
 */
import { Effect } from "effect"

let attempts = 0
const sendMetrics: Effect.Effect<void, string> = Effect.suspend(() => {
  attempts += 1
  return Effect.fail("metrics offline")
})

//#solution
const main: Effect.Effect<string> = Effect.gen(function*() {
  yield* sendMetrics.pipe(Effect.ignore)
  return "done"
})
//#exercise
const main: Effect.Effect<string> = todo()
//#end

check("result", await Effect.runPromise(main), "done")
check("the metrics were attempted", attempts, 1)
