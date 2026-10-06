/**
 * Sometimes the tag is not enough. Effect.catchIf(predicate, handler)
 * handles only the errors for which the predicate is true. Everything
 * else keeps failing.
 *
 * Goal: treat a 404 as an empty body. Any other status must still fail.
 */
// I AM NOT DONE
import { Data, Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class HttpError extends Data.TaggedError("HttpError")<{ readonly status: number }> {}

const get = (status: number): Effect.Effect<string, HttpError> =>
  status === 200 ? Effect.succeed("body") : Effect.fail(new HttpError({ status }))

const getOrEmpty = (status: number): Effect.Effect<string, HttpError> => todo()

check("200", await Effect.runPromise(getOrEmpty(200)), "body")
check("404 becomes empty", await Effect.runPromise(getOrEmpty(404)), "")
const error = await rejection(Effect.runPromise(getOrEmpty(500)))
check("500 still fails", error instanceof HttpError ? error.status : -1, 500)
