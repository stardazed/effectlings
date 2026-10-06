/**
 * A Schedule is a value that describes WHEN to run something again, and when
 * to stop. retry and repeat both accept one.
 *
 *   Schedule.recurs(n)   run again up to n times, with no waiting in between
 *
 * { times: 3 } was shorthand for Schedule.recurs(3). A schedule can be named,
 * shared and combined, which is what the next exercises do.
 *
 * Goal: define the policy so the task succeeds on its fourth attempt.
 */
// I AM NOT DONE
import { Effect, Schedule } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let attempts = 0
const task: Effect.Effect<string, "busy"> = Effect.suspend(() => {
  attempts += 1
  return attempts < 4 ? Effect.fail("busy" as const) : Effect.succeed("done")
})

const policy: Schedule.Schedule<number> = todo()

check("result", await Effect.runPromise(task.pipe(Effect.retry(policy))), "done")
check("attempts", attempts, 4)
