/**
 * Real environment variables are a flat set of NAME=value pairs.
 * ConfigProvider.fromEnvRecord(record) reads such a record (pass process.env
 * in production, a literal object in tests), and joins nested names with an
 * underscore: group "APP" and key "PORT" is the variable APP_PORT.
 *
 * Goal: read the port from the APP group of an environment-style record.
 */
// I AM NOT DONE
import { ConfigProvider, Config, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const port = Config.nested(Config.Int("PORT"), "APP")

const provider: Layer.Layer<never> = todo()

check("port", await Effect.runPromise(port.pipe(Effect.provide(provider))), 3000)
