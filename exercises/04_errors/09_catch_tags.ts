/**
 * When each error needs its own answer, use catchTags with an object:
 *
 *   program.pipe(Effect.catchTags({
 *     NotFound: (error) => Effect.succeed(...),
 *     Denied: (error) => Effect.succeed(...)
 *   }))
 *
 * Each handler sees its own error type. Handle every tag and E becomes never.
 *
 * Goal: render a page for every outcome: "page", "404", "403 for <who>",
 * or "timed out after <ms>ms".
 */
// I AM NOT DONE
import { Data, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"
import type { Equal, Expect } from "../../src/types.ts"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}
class Denied extends Data.TaggedError("Denied")<{ readonly who: string }> {}
class Timeout extends Data.TaggedError("Timeout")<{ readonly ms: number }> {}

const fetchPage = (n: number): Effect.Effect<string, NotFound | Denied | Timeout> =>
  n === 1
    ? Effect.succeed("page")
    : n === 2
    ? Effect.fail(new NotFound({ id: n }))
    : n === 3
    ? Effect.fail(new Denied({ who: "guest" }))
    : Effect.fail(new Timeout({ ms: 50 }))

const render = (n: number): Effect.Effect<string> => todo()

export type Test = Expect<Equal<Effect.Error<ReturnType<typeof render>>, never>>

check("ok", await Effect.runPromise(render(1)), "page")
check("not found", await Effect.runPromise(render(2)), "404")
check("denied", await Effect.runPromise(render(3)), "403 for guest")
check("timeout", await Effect.runPromise(render(4)), "timed out after 50ms")
