//#title Feeding a layer its dependencies
//#kind complete
//#teaches Layer.provide
//#hint usersLayer needs Db, and dbLayer provides Db.
//#hint usersLayer.pipe(Layer.provide(...))
/**
 * Layer.provide(dependency) satisfies what another layer needs:
 *
 *   usersLayer.pipe(Layer.provide(dbLayer))
 *
 * The result provides only what usersLayer provides (Users). The Db is an
 * internal detail. Its RIn shrinks from Db to never.
 *
 * Goal: build appLayer: a layer that provides Users and needs nothing.
 */
import { Context, Effect, Layer } from "effect"

class Db extends Context.Service<Db, { readonly url: string }>()("Db") {}
class Users extends Context.Service<Users, { readonly describe: () => string }>()("Users") {}

const dbLayer: Layer.Layer<Db> = Layer.succeed(Db, Db.of({ url: "memory://" }))

const usersLayer: Layer.Layer<Users, never, Db> = Layer.effect(
  Users,
  Effect.gen(function*() {
    const db = yield* Db
    return Users.of({ describe: () => `users at ${db.url}` })
  })
)

//#solution
const appLayer: Layer.Layer<Users> = usersLayer.pipe(Layer.provide(dbLayer))
//#exercise
const appLayer: Layer.Layer<Users> = todo()
//#end

const program = Users.useSync((u) => u.describe()).pipe(Effect.provide(appLayer))
check("result", Effect.runSync(program), "users at memory://")
