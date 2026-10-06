//#title Translate: constructor injection
//#kind translate
//#deepens Layer.effect, Layer.Layer, Effect.fn, Context.Service
//#hint The constructor parameters become things you yield* at the top of the layer's generator.
//#hint Inside Layer.effect(UserService, Effect.gen(...)): const db = yield* Db; const mailer = yield* Mailer; then define register.
/**
 * Plain TypeScript:
 *
 *   class UserService {
 *     constructor(private db: Db, private mailer: Mailer) {}
 *
 *     async register(name: string): Promise<string> {
 *       await this.db.save(name)
 *       await this.mailer.send(name)
 *       return `registered ${name}`
 *     }
 *   }
 *   const service = new UserService(new PgDb(), new SmtpMailer())
 *
 * The constructor's parameters are the layer's requirements, and `new` is
 * replaced by building the layer. Db and Mailer are given as services.
 * Write UserService.layer, typed Layer<UserService, never, Db | Mailer>.
 */
import { Context, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Db extends Context.Service<Db, { readonly save: (name: string) => Effect.Effect<void> }>()("Db") {}
class Mailer extends Context.Service<Mailer, { readonly send: (name: string) => Effect.Effect<void> }>()("Mailer") {}

class UserService extends Context.Service<UserService, {
  readonly register: (name: string) => Effect.Effect<string>
}>()("UserService") {
//#solution
  static readonly layer: Layer.Layer<UserService, never, Db | Mailer> = Layer.effect(
    UserService,
    Effect.gen(function*() {
      const db = yield* Db
      const mailer = yield* Mailer
      const register = Effect.fn("UserService.register")(function*(name: string) {
        yield* db.save(name)
        yield* mailer.send(name)
        return `registered ${name}`
      })
      return UserService.of({ register })
    })
  )
//#exercise
  static readonly layer: Layer.Layer<UserService, never, Db | Mailer> = todo()
//#end
}

const calls: Array<string> = []
const deps = Layer.mergeAll(
  Layer.succeed(Db, Db.of({ save: (n) => Effect.sync(() => { calls.push(`save ${n}`) }) })),
  Layer.succeed(Mailer, Mailer.of({ send: (n) => Effect.sync(() => { calls.push(`send ${n}`) }) }))
)

const program = UserService.use((s) => s.register("ada")).pipe(
  Effect.provide(UserService.layer.pipe(Layer.provide(deps)))
)

check("result", Effect.runSync(program), "registered ada")
check("calls in order", calls, ["save ada", "send ada"])
