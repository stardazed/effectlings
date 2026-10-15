//#title Mutable state with Ref
//#kind complete
//#teaches Ref.Ref, Ref.make, Ref.get, Ref.set
//#hint Ref.make creates the Ref with an initial value. get reads it, set replaces it.
//#hint const status = yield* Ref.make("draft"); const before = yield* Ref.get(status); yield* Ref.set(status, "published")
/**
 * A Ref is a safe mutable cell. Every operation is an Effect:
 *
 *   Ref.make(initial)     create one
 *   Ref.get(ref)          read it
 *   Ref.set(ref, value)   replace it
 *
 * Unlike a `let` variable, a Ref is safe to share between fibers.
 *
 * Goal: return the status before and after publishing.
 */
import { Effect, Ref } from "effect"

//#solution
const program: Effect.Effect<Array<string>> = Effect.gen(function*() {
  const status: Ref.Ref<string> = yield* Ref.make("draft")
  const before = yield* Ref.get(status)
  yield* Ref.set(status, "published")
  const after = yield* Ref.get(status)
  return [before, after]
})
//#exercise
const program: Effect.Effect<Array<string>> = todo()
//#end

check("before and after", await Effect.runPromise(program), ["draft", "published"])
