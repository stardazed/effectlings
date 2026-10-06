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

const program = risky.pipe(Effect.catch(() => Effect.succeed("recovered")))

check("result", await Effect.runPromise(program), "recovered")
