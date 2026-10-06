//#title A default when you do not care why
//#kind complete
//#teaches Effect.orElseSucceed
//#hint orElseSucceed takes a function that returns the default value.
//#hint parseCount(s).pipe(Effect.orElseSucceed(() => 0))
/**
 * Effect.orElseSucceed(() => value) replaces any failure with a plain value.
 * Unlike Effect.catch, it does not look at the error. Use it when the
 * reason does not matter, only the fallback.
 *
 * Goal: a count that is 0 whenever parsing fails.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const parseCount = (s: string): Effect.Effect<number, string> =>
  Number.isInteger(Number(s)) ? Effect.succeed(Number(s)) : Effect.fail(`not an integer: ${s}`)

//#solution
const countOrZero = (s: string): Effect.Effect<number> => parseCount(s).pipe(Effect.orElseSucceed(() => 0))
//#exercise
const countOrZero = (s: string): Effect.Effect<number> => todo()
//#end

check("valid", await Effect.runPromise(countOrZero("12")), 12)
check("invalid", await Effect.runPromise(countOrZero("x")), 0)
