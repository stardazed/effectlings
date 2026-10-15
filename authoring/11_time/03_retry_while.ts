//#title Only retry what can get better
//#kind complete
//#deepens Effect.retry, Data.TaggedError
//#hint while is a predicate on the error. Retry only when it returns true.
//#hint call.pipe(Effect.retry({ while: (e) => e._tag === "Timeout", times: 5 }))
/**
 * Retrying a permanent error is pointless: a bad request stays bad. Give
 * retry a `while` predicate. It receives the error and says whether another
 * attempt is worth it.
 *
 *   Effect.retry({ while: (error) => error._tag === "Timeout", times: 5 })
 *
 * Goal: retry timeouts, but give up at once on a BadRequest.
 */
import { Data, Effect } from "effect"

class Timeout extends Data.TaggedError("Timeout")<{}> {}
class BadRequest extends Data.TaggedError("BadRequest")<{}> {}

const scripted = (script: ReadonlyArray<"timeout" | "bad" | "ok">) => {
  let index = 0
  const call: Effect.Effect<string, Timeout | BadRequest> = Effect.suspend((): Effect.Effect<string, Timeout | BadRequest> => {
    const step = script[index++]
    if (step === "ok") return Effect.succeed("ok")
    return step === "timeout" ? Effect.fail(new Timeout()) : Effect.fail(new BadRequest())
  })
  return { call, attempts: () => index }
}

//#solution
const resilient = (call: Effect.Effect<string, Timeout | BadRequest>): Effect.Effect<string, Timeout | BadRequest> =>
  call.pipe(Effect.retry({ while: (e) => e._tag === "Timeout", times: 5 }))
//#exercise
const resilient = (call: Effect.Effect<string, Timeout | BadRequest>): Effect.Effect<string, Timeout | BadRequest> => todo()
//#end

const transient = scripted(["timeout", "timeout", "ok"])
check("timeouts are retried", await Effect.runPromise(resilient(transient.call)), "ok")
check("three attempts", transient.attempts(), 3)

const permanent = scripted(["timeout", "bad", "ok"])
const exit = await Effect.runPromiseExit(resilient(permanent.call))
check("a bad request is not retried", String(exit).includes("BadRequest"), true)
check("so it stopped at attempt two", permanent.attempts(), 2)
