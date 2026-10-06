/**
 * A service class has two one-liners for touching a service without a generator:
 *
 *   Service.useSync((s) => plainValue)     returns Effect<value, never, Service>
 *   Service.use((s) => someEffect)         returns the effect, now needing Service
 *
 * They are fine for a single access. As soon as you do several things with
 * the service, prefer `yield*` in a generator: the dependency stays visible.
 *
 * Goal: read the port with useSync, and run describe with use.
 */
// I AM NOT DONE
import { Context, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Settings extends Context.Service<Settings, {
  readonly port: number
  readonly describe: () => Effect.Effect<string>
}>()("Settings") {}

const port: Effect.Effect<number, never, Settings> = todo()
const description: Effect.Effect<string, never, Settings> = todo()

const settings = Effect.provideService(Settings, { port: 8080, describe: () => Effect.succeed("local settings") })

check("port", Effect.runSync(port.pipe(settings)), 8080)
check("description", Effect.runSync(description.pipe(settings)), "local settings")
