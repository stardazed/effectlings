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
// I AM NOT DONE
import { Context, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

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

const appLayer: Layer.Layer<Users> = todo()

const program = Users.useSync((u) => u.describe()).pipe(Effect.provide(appLayer))
check("result", Effect.runSync(program), "users at memory://")
