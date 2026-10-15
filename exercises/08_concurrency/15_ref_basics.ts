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
// I AM NOT DONE
import { Effect, Ref } from "effect"

const program: Effect.Effect<Array<string>> = todo()

check("before and after", await Effect.runPromise(program), ["draft", "published"])
