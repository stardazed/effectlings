//#title Configuration described by a Schema
//#kind complete
//#teaches Config.schema
//#hint Config.schema takes a Schema.Struct whose fields are the setting names.
//#hint Config.schema(Schema.Struct({ HOST: Schema.String, PORT: Schema.NumberFromString }))
/**
 * You already know schemas. Config.schema(schema) reads a whole group of
 * settings and validates it with a schema, so every rule from the schema
 * chapter (ranges, patterns, defaults, conversions) applies to config too.
 *
 * Goal: a config with HOST (text) and PORT (a number, from text).
 */
import { ConfigProvider, Config, Effect, Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const serverConfig = Config.schema(Schema.Struct({ HOST: Schema.String, PORT: Schema.NumberFromString }))
//#exercise
const serverConfig: Config.Config<{ readonly HOST: string; readonly PORT: number }> = todo()
//#end

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ HOST: "localhost", PORT: "8080" }))
check("config", await Effect.runPromise(serverConfig.pipe(Effect.provide(provider))), { HOST: "localhost", PORT: 8080 })
