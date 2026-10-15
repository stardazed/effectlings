/**
 * Effect.orElseSucceed(() => value) replaces any failure with a plain value.
 * Unlike Effect.catch, it does not look at the error. Use it when the
 * reason does not matter, only the fallback.
 *
 * Goal: a count that is 0 whenever parsing fails.
 */
// I AM NOT DONE
import { Effect } from "effect"

const parseCount = (s: string): Effect.Effect<number, string> =>
  Number.isInteger(Number(s)) ? Effect.succeed(Number(s)) : Effect.fail(`not an integer: ${s}`)

const countOrZero = (s: string): Effect.Effect<number> => todo()

check("valid", await Effect.runPromise(countOrZero("12")), 12)
check("invalid", await Effect.runPromise(countOrZero("x")), 0)
