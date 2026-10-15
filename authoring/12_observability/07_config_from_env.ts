//#title The environment as a provider
//#kind complete
//#teaches ConfigProvider.fromEnvRecord
//#hint fromEnvRecord takes an object shaped like process.env. Nested names are joined with underscores.
//#hint ConfigProvider.layer(ConfigProvider.fromEnvRecord({ APP_PORT: "3000" }))
/**
 * Real environment variables are a flat set of NAME=value pairs.
 * ConfigProvider.fromEnvRecord(record) reads such a record (pass process.env
 * in production, a literal object in tests), and joins nested names with an
 * underscore: group "APP" and key "PORT" is the variable APP_PORT.
 *
 * Goal: read the port from the APP group of an environment-style record.
 */
import { ConfigProvider, Config, Effect, Layer } from "effect"

const port = Config.nested(Config.Int("PORT"), "APP")

//#solution
const provider: Layer.Layer<never> = ConfigProvider.layer(ConfigProvider.fromEnvRecord({ APP_PORT: "3000", OTHER: "x" }))
//#exercise
const provider: Layer.Layer<never> = todo()
//#end

check("port", await Effect.runPromise(port.pipe(Effect.provide(provider))), 3000)
