/**
 * An app starts its database, then its server. On shutdown it must stop
 * the server first, then the database. Layers give you that order for free:
 * a layer is released before the layers it depends on.
 *
 * Goal: write serverLayer. It needs Db, logs "server up" when built and
 * "server down" when released. Then write appLayer by feeding it dbLayer.
 */
// I AM NOT DONE
import { Context, Effect, Layer } from "effect"

const log: Array<string> = []

class Db extends Context.Service<Db, { readonly id: number }>()("Db") {}
class Server extends Context.Service<Server, { readonly port: number }>()("Server") {}

const dbLayer: Layer.Layer<Db> = Layer.effect(
  Db,
  Effect.acquireRelease(
    Effect.sync(() => { log.push("db up"); return Db.of({ id: 1 }) }),
    () => Effect.sync(() => { log.push("db down") })
  )
)

const serverLayer: Layer.Layer<Server, never, Db> = todo()

const appLayer: Layer.Layer<Server> = todo()

const program = Effect.gen(function*() {
  const server = yield* Server
  log.push("request")
  return server.port
}).pipe(Effect.provide(appLayer))

check("result", await Effect.runPromise(program), 8080)
check("log", log, ["db up", "server up", "request", "server down", "db down"])
