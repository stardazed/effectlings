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

const log: Array<string> = []
const cleanup = Effect.sync(() => { log.push("cleanup") })

const withCleanup = <A, E>(task: Effect.Effect<A, E>): Effect.Effect<A, E> => task.pipe(Effect.ensuring(cleanup))

check("success result", await Effect.runPromise(withCleanup(Effect.succeed("ok"))), "ok")
check("cleanup ran after success", log, ["cleanup"])
const exit = await Effect.runPromiseExit(withCleanup(Effect.fail("boom")))
check("failure is preserved", Exit.isFailure(exit), true)
check("cleanup ran after failure", log, ["cleanup", "cleanup"])
