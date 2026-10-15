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
// I AM NOT DONE
import { Context, Effect, Layer } from "effect"

class Db extends Context.Service<Db, { readonly save: (name: string) => Effect.Effect<void> }>()("Db") {}
class Mailer extends Context.Service<Mailer, { readonly send: (name: string) => Effect.Effect<void> }>()("Mailer") {}

class UserService extends Context.Service<UserService, {
  readonly register: (name: string) => Effect.Effect<string>
}>()("UserService") {
  static readonly layer: Layer.Layer<UserService, never, Db | Mailer> = todo()
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
