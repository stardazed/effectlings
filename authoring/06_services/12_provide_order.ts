//#title Provide from the outside in
//#kind fix
//#deepens Effect.provide, Layer.provide
//#hint The program needs Users. Users needs Db. Which layer must be provided first?
//#hint Provide usersLayer first (it satisfies the program), then dbLayer (it satisfies usersLayer). Or combine with Layer.provide.
/**
 * Every Effect.provide satisfies the requirements that exist at that moment.
 * If the layer you provide needs something itself, that need moves to the
 * outside, and a later provide must handle it.
 *
 *   program                    needs Users
 *   .pipe(provide(usersLayer)) needs Db   (usersLayer needs Db)
 *   .pipe(provide(dbLayer))    needs nothing
 *
 * Providing in the other order leaves Db unmet. The compiler tells you.
 * The tidier habit is to combine layers first with Layer.provide, then call
 * Effect.provide once.
 *
 * Goal: fix the order so the program can run.
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

const program = Users.useSync((u) => u.describe())

//#solution
const runnable = program.pipe(Effect.provide(usersLayer), Effect.provide(dbLayer))
//#exercise
const runnable = program.pipe(Effect.provide(dbLayer), Effect.provide(usersLayer))
//#end

check("result", Effect.runSync(runnable), "users at memory://")
