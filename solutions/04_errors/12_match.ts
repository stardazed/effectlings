/**
 * Effect.match({ onFailure, onSuccess }) turns both outcomes into plain
 * values. The result cannot fail, so E becomes never.
 *
 * Goal: greet the user, or explain which error prevented it.
 */
import { Data, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}
class Denied extends Data.TaggedError("Denied")<{ readonly who: string }> {}

const lookup = (id: number): Effect.Effect<string, NotFound | Denied> =>
  id === 1 ? Effect.succeed("ada") : id === 2 ? Effect.fail(new NotFound({ id })) : Effect.fail(new Denied({ who: "guest" }))

const greet = (id: number): Effect.Effect<string> =>
  lookup(id).pipe(
    Effect.match({
      onFailure: (e) => `cannot greet: ${e._tag}`,
      onSuccess: (name) => `hello ${name}`
    })
  )

check("success", await Effect.runPromise(greet(1)), "hello ada")
check("not found", await Effect.runPromise(greet(2)), "cannot greet: NotFound")
check("denied", await Effect.runPromise(greet(3)), "cannot greet: Denied")
