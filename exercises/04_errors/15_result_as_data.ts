/**
 * Effect.result(program) never fails. It finishes with a value describing
 * what happened:
 *
 *   { _tag: "Success", success: value }    or    { _tag: "Failure", failure: error }
 *
 * Check `_tag` and TypeScript knows which field you can read. (This value
 * is a `Result`, a data type you will meet properly in the next chapter.)
 *
 * Goal: describe the outcome of parseAge as text.
 */
// I AM NOT DONE
import { Effect } from "effect"

const parseAge = (s: string): Effect.Effect<number, string> =>
  s !== "" && Number.isInteger(Number(s)) ? Effect.succeed(Number(s)) : Effect.fail(`not a number: ${s}`)

const summary: (s: string) => Effect.Effect<string> = todo()

check("valid", await Effect.runPromise(summary("41")), "age 41")
check("invalid", await Effect.runPromise(summary("x")), "error: not a number: x")
