/**
 * catchTag also accepts an array of tags. One handler covers all of them,
 * and its parameter is the union of those error types. Every error has a
 * `_tag`, so you can still tell them apart inside the handler.
 *
 * Goal: recover from both errors, saying which one happened.
 */
// I AM NOT DONE
import { Data, Effect } from "effect"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}
class Denied extends Data.TaggedError("Denied")<{ readonly who: string }> {}

const lookup = (id: number): Effect.Effect<string, NotFound | Denied> =>
  id === 1 ? Effect.succeed("ada") : id === 2 ? Effect.fail(new NotFound({ id })) : Effect.fail(new Denied({ who: "guest" }))

const recovered = (id: number): Effect.Effect<string> => todo()

check("found", await Effect.runPromise(recovered(1)), "ada")
check("not found", await Effect.runPromise(recovered(2)), "recovered from NotFound")
check("denied", await Effect.runPromise(recovered(3)), "recovered from Denied")
