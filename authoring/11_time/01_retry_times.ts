//#title Trying again
//#kind complete
//#teaches Effect.retry
//#hint retry takes an options object. times says how many EXTRA attempts are allowed.
//#hint flaky.pipe(Effect.retry({ times: 3 }))
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
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let attempts = 0
const flaky: Effect.Effect<string, "busy"> = Effect.suspend(() => {
  attempts += 1
  return attempts < 3 ? Effect.fail("busy" as const) : Effect.succeed("done")
})

//#solution
const reliable: Effect.Effect<string, "busy"> = flaky.pipe(Effect.retry({ times: 3 }))
//#exercise
const reliable: Effect.Effect<string, "busy"> = todo()
//#end

check("result", await Effect.runPromise(reliable), "done")
check("it took three attempts", attempts, 3)
