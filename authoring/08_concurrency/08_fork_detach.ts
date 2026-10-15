//#title Outliving the parent
//#kind complete
//#teaches Effect.forkDetach
//#hint forkDetach starts a fiber that is not tied to the parent.
//#hint yield* Effect.forkDetach(job); return "started"
/**
 * Effect.forkDetach(program) starts a fiber that does NOT belong to the
 * parent. It keeps running after the parent has finished.
 *
 * Use it for genuinely independent background work. Because nobody owns
 * that fiber, nobody will interrupt it or see its failure. Prefer forkChild
 * unless you really need this.
 *
 * Goal: start `job` detached and finish with "started" right away.
 */
import { Effect } from "effect"

const log: Array<string> = []
const job = Effect.sleep("10 millis").pipe(Effect.tap(() => Effect.sync(() => { log.push("job done") })))

//#solution
const program: Effect.Effect<string> = Effect.gen(function*() {
  yield* Effect.forkDetach(job)
  return "started"
})
//#exercise
const program: Effect.Effect<string> = todo()
//#end

check("result", await Effect.runPromise(program), "started")
check("the job has not finished yet", log, [])
await new Promise((resolve) => setTimeout(resolve, 40))
check("the job outlived its parent", log, ["job done"])
