/**
 * A Layer has three slots, like an Effect:
 *
 *   Layer<ROut, E, RIn>
 *     ROut  the services it provides
 *     E     how building it can fail
 *     RIn   the services it needs in order to be built
 *
 *   Layer.Success<typeof layer>    ROut
 *   Layer.Error<typeof layer>      E
 *   Layer.Services<typeof layer>   RIn
 *
 * Goal: fix the three aliases so they describe usersLayer.
 */
// I AM NOT DONE
import { Context, Data, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import type { Equal, Expect } from "../../src/types.ts"

class Db extends Context.Service<Db, { readonly connected: boolean }>()("Db") {}
class Users extends Context.Service<Users, { readonly count: () => number }>()("Users") {}
class NotConnected extends Data.TaggedError("NotConnected")<{}> {}

const usersLayer = Layer.effect(
  Users,
  Effect.gen(function*() {
    const db = yield* Db
    if (!db.connected) return yield* new NotConnected()
    return Users.of({ count: () => 3 })
  })
)

type Provides = Db
type Fails = never
type Needs = Users

export type Tests = [
  Expect<Equal<Layer.Success<typeof usersLayer>, Provides>>,
  Expect<Equal<Layer.Error<typeof usersLayer>, Fails>>,
  Expect<Equal<Layer.Services<typeof usersLayer>, Needs>>
]

const count = Users.useSync((u) => u.count()).pipe(
  Effect.provide(usersLayer),
  Effect.provideService(Db, { connected: true })
)
check("it works once Db is provided", Effect.runSync(count), 3)
