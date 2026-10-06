//#title Translate: JSON.parse with a cast
//#kind translate
//#deepens Schema.fromJsonString, Schema.decodeUnknownEffect, Schema.SchemaError, Schema.isSchemaError
//#hint Decode the text with the schema from fromJsonString, using decodeUnknownEffect.
//#hint Schema.decodeUnknownEffect(Schema.fromJsonString(Config))(text)
/**
 * Plain TypeScript:
 *
 *   function loadConfig(text: string): Config {
 *     return JSON.parse(text) as Config        // a promise to the compiler, not a check
 *   }
 *
 * The cast tells TypeScript to trust the data. If the JSON is wrong, the
 * program carries on with bad data until something breaks far away.
 *
 * Write the honest version: an Effect that fails with a SchemaError when the
 * text is not valid JSON or does not have the right shape.
 */
import { Effect, Schema } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Config = Schema.Struct({ host: Schema.String, port: Schema.Number })

//#solution
const loadConfig = (text: string): Effect.Effect<typeof Config.Type, Schema.SchemaError> =>
  Schema.decodeUnknownEffect(Schema.fromJsonString(Config))(text)
//#exercise
const loadConfig = (text: string): Effect.Effect<typeof Config.Type, Schema.SchemaError> => todo()
//#end

check("valid", await Effect.runPromise(loadConfig('{"host":"localhost","port":8080}')), { host: "localhost", port: 8080 })
check("invalid JSON", Schema.isSchemaError(await rejection(Effect.runPromise(loadConfig("{")))), true)
check("wrong shape", Schema.isSchemaError(await rejection(Effect.runPromise(loadConfig('{"host":1}')))), true)
