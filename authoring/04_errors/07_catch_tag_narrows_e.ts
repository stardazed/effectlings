//#title What is left after catchTag
//#kind fix
//#deepens Effect.catchTag, Effect.Error
//#hint catchTag removes the tag it handled. Which tag does it handle here?
//#hint The program handles "NotFound", so only Denied remains.
/**
 * After catchTag("X", ...), the tag X is gone from E and everything else
 * stays. Read the type from the handler, not from the original signature.
 *
 * Goal: fix `Remaining` so it is exactly what can still fail.
 */
import { Data, Effect } from "effect"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}
class Denied extends Data.TaggedError("Denied")<{ readonly who: string }> {}

const lookup = (id: number): Effect.Effect<string, NotFound | Denied> =>
  id === 1 ? Effect.succeed("ada") : id === 2 ? Effect.fail(new NotFound({ id })) : Effect.fail(new Denied({ who: "guest" }))

const program = lookup(2).pipe(Effect.catchTag("NotFound", (e) => Effect.succeed(`no user ${e.id}`)))

//#solution
type Remaining = Denied
//#exercise
type Remaining = NotFound
//#end

export type Test = Expect<Equal<Effect.Error<typeof program>, Remaining>>

check("recovered", await Effect.runPromise(program), "no user 2")
