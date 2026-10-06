/**
 * Put the chapter together.
 *
 * 1. Users.layer: a Layer<Users, never, Db | Mailer>. welcome(id) finds the
 *    user's name with Db, sends "Welcome, <name>" to "<name lower case>@example.com"
 *    with Mailer, and finishes with "welcomed <name>". An unknown id fails with
 *    NotFound (Db already fails that way).
 * 2. appLayer: Layer<Users>, with the Db and Mailer layers already fed in.
 */
import { Context, Data, Effect, Layer } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}

class Db extends Context.Service<Db, {
  readonly findName: (id: number) => Effect.Effect<string, NotFound>
}>()("Db") {}

class Mailer extends Context.Service<Mailer, {
  readonly send: (to: string, text: string) => Effect.Effect<void>
}>()("Mailer") {}

const outbox: Array<string> = []

const dbLayer = Layer.succeed(
  Db,
  Db.of({
    findName: (id) => (id === 1 ? Effect.succeed("Ada") : Effect.fail(new NotFound({ id })))
  })
)
const mailerLayer = Layer.succeed(
  Mailer,
  Mailer.of({ send: (to, text) => Effect.sync(() => { outbox.push(`${to}: ${text}`) }) })
)

class Users extends Context.Service<Users, {
  readonly welcome: (id: number) => Effect.Effect<string, NotFound>
}>()("Users") {
  static readonly layer: Layer.Layer<Users, never, Db | Mailer> = Layer.effect(
    Users,
    Effect.gen(function*() {
      const db = yield* Db
      const mailer = yield* Mailer
      const welcome = Effect.fn("Users.welcome")(function*(id: number) {
        const name = yield* db.findName(id)
        yield* mailer.send(`${name.toLowerCase()}@example.com`, `Welcome, ${name}`)
        return `welcomed ${name}`
      })
      return Users.of({ welcome })
    })
  )
}

const appLayer: Layer.Layer<Users> = Users.layer.pipe(Layer.provide(Layer.mergeAll(dbLayer, mailerLayer)))

const run = (id: number) => Users.use((u) => u.welcome(id)).pipe(Effect.provide(appLayer))

check("known user", await Effect.runPromise(run(1)), "welcomed Ada")
check("the mail was sent", outbox, ["ada@example.com: Welcome, Ada"])
check("unknown user", (await rejection(Effect.runPromise(run(9)))) instanceof NotFound, true)
