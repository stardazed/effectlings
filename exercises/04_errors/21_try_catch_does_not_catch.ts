/**
 * A failed Effect does not throw. Its failure travels in the E channel,
 * so a JavaScript try/catch around `yield*` never sees it.
 *
 * Goal: this program should finish with "recovered". Right now it fails
 * with "boom". Fix it.
 */
// I AM NOT DONE
import { Effect } from "effect"

const risky: Effect.Effect<string, string> = Effect.fail("boom")

const program = Effect.gen(function*() {
  try {
    return yield* risky
  } catch {
    return "recovered"
  }
})

check("result", await Effect.runPromise(program), "recovered")
