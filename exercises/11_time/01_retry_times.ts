/**
 * Some failures are temporary: a busy server, a dropped connection.
 * Effect.retry runs the program again when it fails with a typed failure.
 *
 *   program.pipe(Effect.retry({ times: 3 }))
 *
 * `times` counts the retries after the first attempt, so { times: 3 } allows
 * up to four attempts in total. If every attempt fails, the last failure is
 * the result.
 *
 * Goal: make `flaky` succeed, even though its first two attempts fail.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let attempts = 0
const flaky: Effect.Effect<string, "busy"> = Effect.suspend(() => {
  attempts += 1
  return attempts < 3 ? Effect.fail("busy" as const) : Effect.succeed("done")
})

const reliable: Effect.Effect<string, "busy"> = todo()

check("result", await Effect.runPromise(reliable), "done")
check("it took three attempts", attempts, 3)
