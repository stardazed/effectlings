//#title From Option to Effect
//#kind complete
//#teaches Effect.fromOption
//#hint Effect.fromOption turns none into a failure. Then rename the failure with mapError.
//#hint Effect.fromOption(findUser(id)).pipe(Effect.mapError(() => new NotFound({ id })))
/**
 * Effect.fromOption(option) is a program that succeeds with the value of a
 * some, and fails for a none. The failure it produces is a generic
 * "no such element" error, so you usually rename it with mapError.
 *
 * Goal: turn the optional lookup into a program that fails with NotFound.
 */
import { Data, Effect, Option } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}

const findUser = (id: number): Option.Option<string> => (id === 1 ? Option.some("Ada") : Option.none())

//#solution
const requireUser = (id: number): Effect.Effect<string, NotFound> =>
  Effect.fromOption(findUser(id)).pipe(Effect.mapError(() => new NotFound({ id })))
//#exercise
const requireUser = (id: number): Effect.Effect<string, NotFound> => todo()
//#end

check("found", await Effect.runPromise(requireUser(1)), "Ada")
check("missing", (await rejection(Effect.runPromise(requireUser(2)))) instanceof NotFound, true)
