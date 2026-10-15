/**
 * Plain TypeScript:
 *
 *   class NotFoundError extends Error {}
 *   class DeniedError extends Error {}
 *
 *   async function greet(id: number): Promise<string> {
 *     try {
 *       const name = await load(id)
 *       return `hello ${name}`
 *     } catch (e) {
 *       if (e instanceof NotFoundError) return "hello stranger"
 *       if (e instanceof DeniedError) return "access denied"
 *       throw e
 *     }
 *   }
 *
 * The Effect version has no instanceof chain. The types say which errors
 * exist, and catchTags handles them by tag. The `throw e` at the end
 * becomes the errors you do not handle: they stay in E.
 *
 * `load` already fails with tagged errors. Write greet.
 */
import { Data, Effect } from "effect"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}
class Denied extends Data.TaggedError("Denied")<{ readonly who: string }> {}
class Crash extends Data.TaggedError("Crash")<{ readonly reason: string }> {}

const load = (id: number): Effect.Effect<string, NotFound | Denied | Crash> =>
  id === 1
    ? Effect.succeed("ada")
    : id === 2
    ? Effect.fail(new NotFound({ id }))
    : id === 3
    ? Effect.fail(new Denied({ who: "guest" }))
    : Effect.fail(new Crash({ reason: "disk" }))

const greet = (id: number) =>
  load(id).pipe(
    Effect.map((name) => `hello ${name}`),
    Effect.catchTags({
      NotFound: () => Effect.succeed("hello stranger"),
      Denied: () => Effect.succeed("access denied")
    })
  )

check("known user", await Effect.runPromise(greet(1)), "hello ada")
check("unknown user", await Effect.runPromise(greet(2)), "hello stranger")
check("denied", await Effect.runPromise(greet(3)), "access denied")
check("crash is not handled", (await rejection(Effect.runPromise(greet(4)))) instanceof Crash, true)
