//#title Scope in the type
//#kind fix
//#teaches Scope.Scope
//#hint acquireRelease leaves a promise to release later. That promise is a requirement: Scope.
//#hint Needs is Scope.Scope. After Effect.scoped, nothing is required.
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
import { Effect, Scope } from "effect"

const acquired = Effect.acquireRelease(Effect.succeed("res"), () => Effect.void)
const released = Effect.scoped(acquired)

//#solution
type Needs = Scope.Scope
type NeedsAfterScoped = never
//#exercise
type Needs = never
type NeedsAfterScoped = Scope.Scope
//#end

export type Tests = [
  Expect<Equal<Effect.Services<typeof acquired>, Needs>>,
  Expect<Equal<Effect.Services<typeof released>, NeedsAfterScoped>>
]

check("scoped can be run", await Effect.runPromise(released), "res")
