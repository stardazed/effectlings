/**
 * Effect.catch(handler) runs when the program fails. The handler receives
 * the error and returns an Effect that takes over.
 *
 *   program.pipe(Effect.catch((error) => Effect.succeed(fallback)))
 *
 * If the handler cannot fail, the new program cannot fail either: E becomes never.
 *
 * Goal: fall back to port 3000 whenever the input cannot be parsed.
 */
// I AM NOT DONE
import { Data, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class ParseError extends Data.TaggedError("ParseError")<{ readonly input: string }> {}

const parsePort = (input: string): Effect.Effect<number, ParseError> => {
  const n = Number(input)
  return Number.isInteger(n) && n > 0 ? Effect.succeed(n) : Effect.fail(new ParseError({ input }))
}

const portOrDefault = (input: string): Effect.Effect<number> => todo()

check("valid port", await Effect.runPromise(portOrDefault("8080")), 8080)
check("invalid port", await Effect.runPromise(portOrDefault("abc")), 3000)
