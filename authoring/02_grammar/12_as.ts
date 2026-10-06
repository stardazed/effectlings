//#title Replacing the result
//#kind complete
//#teaches Effect.as, Effect.asVoid
//#hint Effect.as(value) ignores the old result and produces the new one.
//#hint saved.pipe(Effect.as("created")) and saved.pipe(Effect.asVoid)
/**
 * Sometimes the result of a step does not matter.
 *
 *   Effect.as(x)      replace the result with x
 *   Effect.asVoid     replace the result with undefined
 *
 * Goal: after `save` runs, produce "created", and also produce nothing.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const save = Effect.succeed({ rowsWritten: 1 })

//#solution
const message: Effect.Effect<string> = save.pipe(Effect.as("created"))
const quiet: Effect.Effect<void> = save.pipe(Effect.asVoid)
//#exercise
const message: Effect.Effect<string> = todo()
const quiet: Effect.Effect<void> = todo()
//#end

check("message", Effect.runSync(message), "created")
check("quiet", Effect.runSync(quiet), undefined)
