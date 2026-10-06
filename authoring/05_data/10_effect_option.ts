//#title Failure to Option
//#kind complete
//#teaches Effect.option
//#hint Effect.option is a value you pass to pipe, like Effect.ignore.
//#hint parseAge(s).pipe(Effect.option)
/**
 * Effect.option turns a program that may fail into one that never fails:
 * success becomes some(value), failure becomes none. The reason for the
 * failure is thrown away.
 *
 * Compare: Effect.result keeps the error, Effect.option drops it.
 *
 * Goal: parse an age, getting an Option instead of a failure.
 */
import { Effect, Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const parseAge = (s: string): Effect.Effect<number, string> =>
  s !== "" && Number.isInteger(Number(s)) ? Effect.succeed(Number(s)) : Effect.fail(`not a number: ${s}`)

//#solution
const maybeAge = (s: string): Effect.Effect<Option.Option<number>> => parseAge(s).pipe(Effect.option)
//#exercise
const maybeAge = (s: string): Effect.Effect<Option.Option<number>> => todo()
//#end

check("valid", Effect.runSync(maybeAge("41")), Option.some(41))
check("invalid", Effect.runSync(maybeAge("x")), Option.none())
