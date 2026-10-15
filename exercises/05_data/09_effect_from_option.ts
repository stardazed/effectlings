/**
 * Effect.fromOption(option) is a program that succeeds with the value of a
 * some, and fails for a none. The failure it produces is a generic
 * "no such element" error, so you usually rename it with mapError.
 *
 * Goal: turn the optional lookup into a program that fails with NotFound.
 */
// I AM NOT DONE
import { Data, Effect, Option } from "effect"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}

const findUser = (id: number): Option.Option<string> => (id === 1 ? Option.some("Ada") : Option.none())

const requireUser = (id: number): Effect.Effect<string, NotFound> => todo()

check("found", await Effect.runPromise(requireUser(1)), "Ada")
check("missing", (await rejection(Effect.runPromise(requireUser(2)))) instanceof NotFound, true)
