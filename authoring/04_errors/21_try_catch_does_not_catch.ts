//#title try/catch does not catch failures
//#kind fix
//#deepens Effect.catch, Effect.gen, yield*
//#hint A failing effect does not throw an exception, so the catch block never runs.
//#hint Drop the try/catch and use Effect.catch on the effect itself.
/**
 * A failed Effect does not throw. Its failure travels in the E channel,
 * so a JavaScript try/catch around `yield*` never sees it. The catch block
 * is dead code.
 *
 * Failures are handled with Effect.catch, Effect.catchTag and friends.
 *
 * Goal: this program should finish with "recovered". Right now it fails
 * with "boom". Fix it.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"

const risky: Effect.Effect<string, string> = Effect.fail("boom")

//#solution
const program = risky.pipe(Effect.catch(() => Effect.succeed("recovered")))
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
