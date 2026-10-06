//#title Keep the original error as cause
//#kind complete
//#deepens Effect.tryPromise, Data.TaggedError
//#hint Give catch the raw value and store it in the error: new DbError({ cause }).
//#hint catch: (cause) => new DbError({ cause })
/**
 * Earlier you turned a rejection into a string with `instanceof Error`.
 * There is a better habit: wrap the raw value in your own tagged error and
 * keep it in a field called `cause`. No guessing about its shape, and
 * nothing is lost.
 *
 *   class DbError extends Data.TaggedError("DbError")<{ readonly cause: unknown }> {}
 *
 *   catch: (cause) => new DbError({ cause })
 *
 * Callers handle DbError by tag. Only code that wants details looks
 * inside `cause`.
 *
 * Goal: wrap queryRaw.
 */
import { Data, Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class DbError extends Data.TaggedError("DbError")<{ readonly cause: unknown }> {}

const queryRaw = (sql: string): Promise<ReadonlyArray<string>> =>
  sql.startsWith("select") ? Promise.resolve(["row"]) : Promise.reject(new Error("syntax error"))

//#solution
const query = (sql: string): Effect.Effect<ReadonlyArray<string>, DbError> =>
  Effect.tryPromise({
    try: () => queryRaw(sql),
    catch: (cause) => new DbError({ cause })
  })
//#exercise
const query = (sql: string): Effect.Effect<ReadonlyArray<string>, DbError> => todo()
//#end

check("good query", await Effect.runPromise(query("select 1")), ["row"])
const error = await rejection(Effect.runPromise(query("oops")))
check("bad query fails with DbError", error instanceof DbError, true)
check(
  "the original error is kept",
  error instanceof DbError && error.cause instanceof Error ? error.cause.message : "",
  "syntax error"
)
