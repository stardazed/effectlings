/**
 * You already know schemas. Config.schema(schema) reads a whole group of
 * settings and validates it with a schema, so every rule from the schema
 * chapter (ranges, patterns, defaults, conversions) applies to config too.
 *
 * Goal: a config with HOST (text) and PORT (a number, from text).
 */
// I AM NOT DONE
import { ConfigProvider, Config, Effect, Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const serverConfig: Config.Config<{ readonly HOST: string; readonly PORT: number }> = todo()

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ HOST: "localhost", PORT: "8080" }))
check("config", await Effect.runPromise(serverConfig.pipe(Effect.provide(provider))), { HOST: "localhost", PORT: 8080 })
