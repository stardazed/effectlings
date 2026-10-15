/**
 * repeat also accepts `until`, a predicate on the value each run produced.
 * It keeps running until the predicate is true, then returns that value.
 * Without a schedule there is no waiting between runs.
 *
 * Goal: keep checking until the status is "ready".
 */
// I AM NOT DONE
import { Effect } from "effect"

const statuses = ["starting", "starting", "ready", "stopped"]
let index = 0
const checkStatus = Effect.sync(() => statuses[index++])

const waitForReady: Effect.Effect<string> = todo()

check("result", await Effect.runPromise(waitForReady), "ready")
check("it stopped checking", index, 3)
