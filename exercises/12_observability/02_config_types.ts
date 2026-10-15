/**
 * Settings usually arrive as text. Config converts them for you:
 *
 *   Config.Number("RATE")     a number                  "0.5"  -> 0.5
 *   Config.Int("RETRIES")     a whole number            "3"    -> 3
 *   Config.Boolean("DEBUG")   true or false             "true" -> true
 *   Config.Port("PORT")       a valid TCP port, 1..65535
 *
 * Text that cannot be converted fails with a ConfigError.
 *
 * Goal: read the four settings into one object.
 */
// I AM NOT DONE
import { ConfigProvider, Config, Effect } from "effect"

const settings: Effect.Effect<{ port: number; debug: boolean; retries: number; rate: number }, Config.ConfigError> = todo()

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ PORT: "8080", DEBUG: "true", RETRIES: "3", RATE: "0.5" }))
check("settings", await Effect.runPromise(settings.pipe(Effect.provide(provider))), { port: 8080, debug: true, retries: 3, rate: 0.5 })
