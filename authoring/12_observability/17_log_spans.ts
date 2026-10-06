//#title Timing a section of logs
//#kind complete
//#teaches Effect.withLogSpan
//#hint withLogSpan takes a label. Every log inside carries it, with the elapsed time.
//#hint work.pipe(Effect.withLogSpan("checkout"))
/**
 * Effect.withLogSpan(label) marks a stretch of code. Log lines written
 * inside it carry the label, and a real logger shows how long the span has
 * been running. That makes "where did the time go?" easy to answer.
 *
 * Goal: put the whole `work` program in a log span called "checkout".
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { recordLogs } from "../../src/observe.ts"
import { todo } from "../../src/todo.ts"

const work = Effect.logInfo("paying")

//#solution
const checkout: Effect.Effect<void> = work.pipe(Effect.withLogSpan("checkout"))
//#exercise
const checkout: Effect.Effect<void> = todo()
//#end

const { logs, layer } = recordLogs()
await Effect.runPromise(checkout.pipe(Effect.provide(layer)))
await Effect.runPromise(work.pipe(Effect.provide(layer)))

check("inside the span", logs[0].spans, ["checkout"])
check("outside the span", logs[1].spans, [])
