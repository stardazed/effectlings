//#title When retries run out
//#kind complete
//#deepens Effect.retry, Effect.exit
//#hint times: 2 allows the first attempt and two retries. Count how many of them fail.
//#hint The task fails on attempts 1, 2 and 3. Three attempts are allowed, so no attempt succeeds.
/**
 * Predict the outcome. The task below fails on its first three attempts and
 * succeeds from the fourth. It is retried with { times: 2 }.
 *
 * How many times is it attempted, and does the program fail?
 */
import { Effect, Exit } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let attempts = 0
const task = Effect.suspend(() => {
  attempts += 1
  return attempts <= 3 ? Effect.fail("busy" as const) : Effect.succeed("done")
})

const exit = await Effect.runPromiseExit(task.pipe(Effect.retry({ times: 2 })))

//#solution
const expected = { attempts: 3, failed: true }
//#exercise
const expected: { attempts: number; failed: boolean } = todo()
//#end

check("outcome", { attempts, failed: Exit.isFailure(exit) }, expected)
