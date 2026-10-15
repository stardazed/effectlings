/**
 * Sometimes the result of a step does not matter.
 *
 *   Effect.as(x)      replace the result with x
 *   Effect.asVoid     replace the result with undefined
 *
 * Goal: after `save` runs, produce "created", and also produce nothing.
 */
// I AM NOT DONE
import { Effect } from "effect"

const save = Effect.succeed({ rowsWritten: 1 })

const message: Effect.Effect<string> = todo()
const quiet: Effect.Effect<void> = todo()

check("message", Effect.runSync(message), "created")
check("quiet", Effect.runSync(quiet), undefined)
