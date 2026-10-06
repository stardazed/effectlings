//#title Reading configuration
//#kind complete
//#teaches Config.String, Config.ConfigError, ConfigProvider.fromUnknown, ConfigProvider.layer
//#hint Config.String takes the name of the key. A Config is an Effect, so yield* it.
//#hint const host = yield* Config.String("HOST")
/**
 * Hard-coded settings make programs hard to deploy. The Config module reads
 * them from outside:
 *
 *   Config.String("HOST")     a Config for a text setting named HOST
 *
 * A Config is itself an Effect, so you read it with `yield*`. Where the
 * values come from is a separate decision, made by a ConfigProvider:
 *
 *   ConfigProvider.fromUnknown({ HOST: "localhost" })   values from a plain object
 *   ConfigProvider.layer(provider)                      a layer that installs it
 *
 * The real environment is the default provider. Tests give an object.
 *
 * A Config fails with a Config.ConfigError when a setting is missing or
 * invalid, so reading one has the type Effect<string, Config.ConfigError>.
 *
 * Goal: read HOST and describe it.
 */
import { ConfigProvider, Config, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const describeHost: Effect.Effect<string, Config.ConfigError> = Effect.gen(function*() {
  const host = yield* Config.String("HOST")
  return `host is ${host}`
})
//#exercise
const describeHost: Effect.Effect<string, Config.ConfigError> = todo()
//#end

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ HOST: "localhost" }))

check("result", await Effect.runPromise(describeHost.pipe(Effect.provide(provider))), "host is localhost")
