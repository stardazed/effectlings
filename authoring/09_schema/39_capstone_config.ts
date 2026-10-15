//#title Capstone: loading configuration
//#kind complete
//#deepens Schema.Struct, Schema.isInt, Schema.isBetween, Schema.Literals, Schema.withDecodingDefaultKey, Schema.fromJsonString, Schema.decodeUnknownEffect, Effect.mapError
//#hint Config: host is a string, port an integer from 1 to 65535, env is an optional "dev" or "prod" defaulting to "dev".
//#hint loadConfig decodes Schema.fromJsonString(Config) and mapErrors the SchemaError into a ConfigError with its message.
/**
 * Bring the chapter together.
 *
 * 1. Config: { host: string, port: integer 1..65535, env: "dev" | "prod" }
 *    where env may be left out of the input and then defaults to "dev".
 * 2. loadConfig(text): decode JSON text into a Config. Any problem (bad
 *    JSON or a bad field) fails with ConfigError, whose `reason` is the
 *    SchemaError's message.
 */
import { Data, Effect, Schema } from "effect"

class ConfigError extends Data.TaggedError("ConfigError")<{ readonly reason: string }> {}

//#solution
const Config: Schema.Codec<{ readonly host: string; readonly port: number; readonly env: "dev" | "prod" }, { readonly host: string; readonly port: number; readonly env?: "dev" | "prod" }> =
  Schema.Struct({
    host: Schema.String,
    port: Schema.Number.check(Schema.isInt(), Schema.isBetween({ minimum: 1, maximum: 65535 })),
    env: Schema.Literals(["dev", "prod"]).pipe(Schema.withDecodingDefaultKey(Effect.succeed("dev" as const)))
  })

const loadConfig = (text: string): Effect.Effect<typeof Config.Type, ConfigError> =>
  Schema.decodeUnknownEffect(Schema.fromJsonString(Config))(text).pipe(
    Effect.mapError((error) => new ConfigError({ reason: error.message }))
  )
//#exercise
const Config: Schema.Codec<
  { readonly host: string; readonly port: number; readonly env: "dev" | "prod" },
  { readonly host: string; readonly port: number; readonly env?: "dev" | "prod" }
> = todo()

const loadConfig = (text: string): Effect.Effect<typeof Config.Type, ConfigError> => todo()
//#end

check("defaults", await Effect.runPromise(loadConfig('{"host":"localhost","port":8080}')), {
  host: "localhost",
  port: 8080,
  env: "dev"
})
check("explicit env", await Effect.runPromise(loadConfig('{"host":"h","port":1,"env":"prod"}')), {
  host: "h",
  port: 1,
  env: "prod"
})
const badPort = await rejection(Effect.runPromise(loadConfig('{"host":"h","port":70000}')))
check("a bad port fails with ConfigError", badPort instanceof ConfigError, true)
check("and says which field", badPort instanceof ConfigError && badPort.reason.includes("port"), true)
const badJson = await rejection(Effect.runPromise(loadConfig("not json")))
check("bad JSON fails with ConfigError", badJson instanceof ConfigError, true)
