/**
 * Effect.catch handles every error. Effect.catchTag handles only errors
 * with a given tag, and removes that error from the type:
 *
 *   program.pipe(Effect.catchTag("NotFound", (error) => Effect.succeed(...)))
 *
 * Effect<string, NotFound | Denied>  becomes  Effect<string, Denied>.
 * This is why tags matter: the compiler tracks exactly what is left to handle.
 *
 * Goal: recover from NotFound with "anonymous". Denied must still fail.
 */
// I AM NOT DONE
import { Data, Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"
import type { Equal, Expect } from "../../src/types.ts"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}
class Denied extends Data.TaggedError("Denied")<{ readonly who: string }> {}

const lookup = (id: number): Effect.Effect<string, NotFound | Denied> =>
  id === 1 ? Effect.succeed("ada") : id === 2 ? Effect.fail(new NotFound({ id })) : Effect.fail(new Denied({ who: "guest" }))

const safe = (id: number): Effect.Effect<string, Denied> => todo()

export type Test = Expect<Equal<Effect.Error<ReturnType<typeof safe>>, Denied>>

check("found", await Effect.runPromise(safe(1)), "ada")
check("recovered", await Effect.runPromise(safe(2)), "anonymous")
check("Denied still fails", (await rejection(Effect.runPromise(safe(3)))) instanceof Denied, true)
