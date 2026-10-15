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
// I AM NOT DONE
import { Effect, Schema } from "effect"

const Config = Schema.Struct({ host: Schema.String, port: Schema.Number })

const loadConfig = (text: string): Effect.Effect<typeof Config.Type, Schema.SchemaError> => todo()

check("valid", await Effect.runPromise(loadConfig('{"host":"localhost","port":8080}')), { host: "localhost", port: 8080 })
check("invalid JSON", Schema.isSchemaError(await rejection(Effect.runPromise(loadConfig("{")))), true)
check("wrong shape", Schema.isSchemaError(await rejection(Effect.runPromise(loadConfig('{"host":1}')))), true)
