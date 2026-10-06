//#title Attaching context to logs
//#kind complete
//#teaches Effect.annotateLogs
//#hint annotateLogs applies to every log inside the program it wraps.
//#hint work.pipe(Effect.annotateLogs({ requestId: "r-1", user: "ada" }))
/**
 * Messages are more useful with context: which request, which user.
 * Effect.annotateLogs(object) adds those fields to EVERY log line written
 * by the program it is applied to, however deep inside:
 *
 *   program.pipe(Effect.annotateLogs({ requestId: "r-1" }))
 *
 * Goal: annotate the whole `handle` program.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { recordLogs } from "../../src/observe.ts"
import { todo } from "../../src/todo.ts"

const step = (name: string) => Effect.logInfo(name)
const work = Effect.gen(function*() {
  yield* step("first")
  yield* step("second")
})

//#solution
const handle: Effect.Effect<void> = work.pipe(Effect.annotateLogs({ requestId: "r-1", user: "ada" }))
//#exercise
const handle: Effect.Effect<void> = todo()
//#end

const { logs, layer } = recordLogs()
await Effect.runPromise(handle.pipe(Effect.provide(layer)))
await Effect.runPromise(Effect.logInfo("outside").pipe(Effect.provide(layer)))

check("inside", logs.slice(0, 2).map((l) => l.annotations), [
  { requestId: "r-1", user: "ada" },
  { requestId: "r-1", user: "ada" }
])
check("outside", logs[2].annotations, {})
