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
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const program = Effect.gen(function*() {
  const status: Ref.Ref<string> = yield* Ref.make("draft")
  const before = yield* Ref.get(status)
  yield* Ref.set(status, "published")
  const after = yield* Ref.get(status)
  return [before, after]
})

check("before and after", await Effect.runPromise(program), ["draft", "published"])
