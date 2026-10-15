//#title try/catch does not catch failures
//#kind fix
//#deepens Effect.catch, Effect.gen, yield*
//#hint A failing effect does not throw an exception, so the catch block never runs.
//#hint Handle the failure on the effect itself, before yield* sees it. Effect.catch does that.
/**
 * A failed Effect does not throw. Its failure travels in the E channel,
 * so a JavaScript try/catch around `yield*` never sees it.
 *
 * Goal: this program should finish with "recovered". Right now it fails
 * with "boom". Fix it.
 */
import { Effect } from "effect"

const risky: Effect.Effect<string, string> = Effect.fail("boom")

//#solution
const program = Effect.gen(function*() {
  return yield* risky.pipe(Effect.catch(() => Effect.succeed("recovered")))
})
//#exercise
const program = Effect.gen(function*() {
  try {
    return yield* risky
  } catch {
    return "recovered"
  }
})
//#end

check("result", await Effect.runPromise(program), "recovered")
