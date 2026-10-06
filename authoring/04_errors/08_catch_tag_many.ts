//#title Several tags, one handler
//#kind complete
//#deepens Effect.catchTag
//#hint Give catchTag an array of tags. The handler receives the union of those errors.
//#hint Effect.catchTag(["NotFound", "Denied"], (e) => Effect.succeed(`recovered from ${e._tag}`))
/**
 * catchTag also accepts an array of tags. One handler covers all of them,
 * and its parameter is the union of those error types. Every error has a
 * `_tag`, so you can still tell them apart inside the handler.
 *
 * Goal: recover from both errors, saying which one happened.
 */
import { Data, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}
class Denied extends Data.TaggedError("Denied")<{ readonly who: string }> {}

const lookup = (id: number): Effect.Effect<string, NotFound | Denied> =>
  id === 1 ? Effect.succeed("ada") : id === 2 ? Effect.fail(new NotFound({ id })) : Effect.fail(new Denied({ who: "guest" }))

//#solution
const recovered = (id: number): Effect.Effect<string> =>
  lookup(id).pipe(Effect.catchTag(["NotFound", "Denied"], (e) => Effect.succeed(`recovered from ${e._tag}`)))
//#exercise
const recovered = (id: number): Effect.Effect<string> => todo()
//#end

check("found", await Effect.runPromise(recovered(1)), "ada")
check("not found", await Effect.runPromise(recovered(2)), "recovered from NotFound")
check("denied", await Effect.runPromise(recovered(3)), "recovered from Denied")
