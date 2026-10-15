/**
 * Predict the outcome. The task below fails on its first three attempts and
 * succeeds from the fourth. It is retried with { times: 2 }.
 *
 * How many times is it attempted, and does the program fail?
 */
import { Effect, Exit } from "effect"

let attempts = 0
const task = Effect.suspend(() => {
  attempts += 1
  return attempts <= 3 ? Effect.fail("busy" as const) : Effect.succeed("done")
})

const exit = await Effect.runPromiseExit(task.pipe(Effect.retry({ times: 2 })))

const expected: { attempts: number; failed: boolean } = { attempts: 3, failed: true }

check("outcome", { attempts, failed: Exit.isFailure(exit) }, expected)
