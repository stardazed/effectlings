//#title Cleanup that always runs
//#kind complete
//#teaches Effect.ensuring
//#hint ensuring takes the cleanup Effect, not a function.
//#hint task.pipe(Effect.ensuring(cleanup))
/**
 * Effect.ensuring(cleanup) runs `cleanup` after a program ends, whether it
 * succeeded or failed. It is finally for Effects:
 *
 *   task.pipe(Effect.ensuring(cleanup))
 *
 * Goal: wrap any task so `cleanup` runs afterwards. The result of the task
 * is unchanged.
 */
import { Effect, Exit } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []
const cleanup = Effect.sync(() => { log.push("cleanup") })

//#solution
const withCleanup = <A, E>(task: Effect.Effect<A, E>): Effect.Effect<A, E> => task.pipe(Effect.ensuring(cleanup))
//#exercise
const withCleanup = <A, E>(task: Effect.Effect<A, E>): Effect.Effect<A, E> => todo()
//#end

check("success result", await Effect.runPromise(withCleanup(Effect.succeed("ok"))), "ok")
check("cleanup ran after success", log, ["cleanup"])
const exit = await Effect.runPromiseExit(withCleanup(Effect.fail("boom")))
check("failure is preserved", Exit.isFailure(exit), true)
check("cleanup ran after failure", log, ["cleanup", "cleanup"])
