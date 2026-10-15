/**
 * Building a service can fail: a missing setting, an unreachable server.
 * That failure is the E slot of the Layer, and it appears in any program
 * that provides the layer.
 *
 * Goal: dbLayer(url) fails with ConnectionFailed when the url is empty,
 * and otherwise provides a Db whose query prefixes the sql with the url.
 */
// I AM NOT DONE
import { Context, Data, Effect, Layer } from "effect"

class ConnectionFailed extends Data.TaggedError("ConnectionFailed")<{ readonly url: string }> {}

class Db extends Context.Service<Db, {
  readonly query: (sql: string) => string
}>()("Db") {}

const dbLayer = (url: string): Layer.Layer<Db, ConnectionFailed> => todo()

const run = (url: string) => Db.useSync((db) => db.query("select 1")).pipe(Effect.provide(dbLayer(url)))

check("connected", await Effect.runPromise(run("pg://x")), "pg://x: select 1")
const error = await rejection(Effect.runPromise(run("")))
check("the layer's failure reaches the program", error instanceof ConnectionFailed, true)
