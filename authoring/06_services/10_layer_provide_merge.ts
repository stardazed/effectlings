//#title Keeping the dependency visible
//#kind complete
//#teaches Layer.provideMerge
//#hint provideMerge feeds the dependency like provide does, and also keeps it in the output.
//#hint usersLayer.pipe(Layer.provideMerge(...))
/**
 * Layer.provide hides the dependency. Layer.provideMerge feeds it in and
 * ALSO exposes it, so the result provides both services:
 *
 *   Layer.Layer<Users | Db>
 *
 * Use it when code further up also needs the dependency.
 *
 * Goal: build a layer that provides both Users and Db.
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
const appLayer: Layer.Layer<Users | Db> = usersLayer.pipe(Layer.provideMerge(dbLayer))
//#exercise
const appLayer: Layer.Layer<Users | Db> = todo()
//#end

const program = Effect.gen(function*() {
  const users = yield* Users
  const db = yield* Db
  return `${users.describe()} / ${db.url}`
}).pipe(Effect.provide(appLayer))

check("both are available", Effect.runSync(program), "users at memory:// / memory://")
