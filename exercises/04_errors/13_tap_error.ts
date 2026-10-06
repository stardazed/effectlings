/**
 * Effect.tapError(f) runs an effect when the program fails, then lets the
 * same failure continue. It is how you log or count errors without
 * handling them.
 *
 * Goal: record the tag of every failure in `seen`. The failures must
 * still fail.
 */
// I AM NOT DONE
import { Data, Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}
class Denied extends Data.TaggedError("Denied")<{ readonly who: string }> {}

const lookup = (id: number): Effect.Effect<string, NotFound | Denied> =>
  id === 1 ? Effect.succeed("ada") : id === 2 ? Effect.fail(new NotFound({ id })) : Effect.fail(new Denied({ who: "guest" }))

const seen: Array<string> = []

const audited = (id: number): Effect.Effect<string, NotFound | Denied> => todo()

check("success", await Effect.runPromise(audited(1)), "ada")
check("nothing seen yet", seen, [])
check("still fails", (await rejection(Effect.runPromise(audited(2)))) instanceof NotFound, true)
await rejection(Effect.runPromise(audited(3)))
check("both failures were seen", seen, ["NotFound", "Denied"])
