/**
 * A layer can own a resource. Give Layer.effect an acquireRelease: the
 * resource is opened when the layer is built and released when the program
 * that provided the layer ends. No manual scope needed.
 *
 * This is how database pools, servers and file handles belong to a service.
 *
 * Goal: a Db layer that logs "connect" when built and "disconnect" when released.
 */
import { Context, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Db extends Context.Service<Db, { readonly id: number }>()("Db") {}

const log: Array<string> = []

const dbLayer: Layer.Layer<Db> = Layer.effect(
  Db,
  Effect.acquireRelease(
    Effect.sync(() => {
      log.push("connect")
      return Db.of({ id: 1 })
    }),
    () => Effect.sync(() => { log.push("disconnect") })
  )
)

const program = Effect.gen(function*() {
  const db = yield* Db
  log.push("using")
  return db.id
}).pipe(Effect.provide(dbLayer))

check("result", await Effect.runPromise(program), 1)
check("log", log, ["connect", "using", "disconnect"])
