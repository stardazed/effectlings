/**
 * A resource that still has to be released is tracked in R as Scope.Scope.
 * Effect will not run such a program until someone provides a scope.
 *
 *   Effect.acquireRelease(...)      R contains Scope.Scope
 *   Effect.scoped(thatProgram)      R no longer contains it: scoped provides the scope
 *
 * Forgetting the release is a compile error, not a leak.
 *
 * Goal: fix the two aliases.
 */
// I AM NOT DONE
import { Effect, Scope } from "effect"
import { check } from "../../src/check.ts"
import type { Equal, Expect } from "../../src/types.ts"

const acquired = Effect.acquireRelease(Effect.succeed("res"), () => Effect.void)
const released = Effect.scoped(acquired)

type Needs = never
type NeedsAfterScoped = Scope.Scope

export type Tests = [
  Expect<Equal<Effect.Services<typeof acquired>, Needs>>,
  Expect<Equal<Effect.Services<typeof released>, NeedsAfterScoped>>
]

check("scoped can be run", await Effect.runPromise(released), "res")
