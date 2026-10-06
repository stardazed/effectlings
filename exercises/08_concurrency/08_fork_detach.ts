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
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []
const job = Effect.sleep("10 millis").pipe(Effect.tap(() => Effect.sync(() => { log.push("job done") })))

const program: Effect.Effect<string> = todo()

check("result", await Effect.runPromise(program), "started")
check("the job has not finished yet", log, [])
await new Promise((resolve) => setTimeout(resolve, 40))
check("the job outlived its parent", log, ["job done"])
