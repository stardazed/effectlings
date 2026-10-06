//#title Failure as data with result
//#kind complete
//#teaches Effect.result
//#hint yield* Effect.result(program) inside a generator. It never fails.
//#hint outcome._tag === "Success" ? outcome.success : outcome.failure
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
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const parseAge = (s: string): Effect.Effect<number, string> =>
  s !== "" && Number.isInteger(Number(s)) ? Effect.succeed(Number(s)) : Effect.fail(`not a number: ${s}`)

//#solution
const summary = Effect.fn("summary")(function*(s: string) {
  const outcome = yield* Effect.result(parseAge(s))
  return outcome._tag === "Success" ? `age ${outcome.success}` : `error: ${outcome.failure}`
})
//#exercise
const summary: (s: string) => Effect.Effect<string> = todo()
//#end

check("valid", await Effect.runPromise(summary("41")), "age 41")
check("invalid", await Effect.runPromise(summary("x")), "error: not a number: x")
