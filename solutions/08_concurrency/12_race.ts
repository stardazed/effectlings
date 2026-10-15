/**
 * Effect.race(a, b) runs both at once. The first to SUCCEED provides the
 * result, and the other is interrupted, so it cannot waste resources.
 *
 * Goal: race `slow` against `fast`.
 */
import { Effect } from "effect"

const log: Array<string> = []
const slow = Effect.sleep("30 millis").pipe(
  Effect.as("slow"),
  Effect.onInterrupt(() => Effect.sync(() => { log.push("slow was interrupted") }))
)
const fast = Effect.sleep("2 millis").pipe(Effect.as("fast"))

const winner: Effect.Effect<string> = Effect.race(slow, fast)

check("result", await Effect.runPromise(winner), "fast")
check("the loser was cancelled", log, ["slow was interrupted"])
