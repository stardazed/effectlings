//#title The use shortcuts
//#kind complete
//#deepens Context.Service
//#hint useSync takes a function from the service to a plain value. use takes one that returns an Effect.
//#hint Settings.useSync((s) => s.port) and Settings.use((s) => s.describe())
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
import { Context, Effect } from "effect"

class Settings extends Context.Service<Settings, {
  readonly port: number
  readonly describe: () => Effect.Effect<string>
}>()("Settings") {}

//#solution
const port: Effect.Effect<number, never, Settings> = Settings.useSync((s) => s.port)
const description: Effect.Effect<string, never, Settings> = Settings.use((s) => s.describe())
//#exercise
const port: Effect.Effect<number, never, Settings> = todo()
const description: Effect.Effect<string, never, Settings> = todo()
//#end

const settings = Effect.provideService(Settings, { port: 8080, describe: () => Effect.succeed("local settings") })

check("port", Effect.runSync(port.pipe(settings)), 8080)
check("description", Effect.runSync(description.pipe(settings)), "local settings")
