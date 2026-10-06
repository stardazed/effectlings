//#title Numbers, flags and ports
//#kind complete
//#teaches Config.Number, Config.Int, Config.Boolean, Config.Port
//#hint Each constructor takes the key name. Values in a provider are text; the Config converts them.
//#hint const port = yield* Config.Port("PORT"); const debug = yield* Config.Boolean("DEBUG"); const retries = yield* Config.Int("RETRIES"); const rate = yield* Config.Number("RATE")
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
import { ConfigProvider, Config, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const settings = Effect.gen(function*() {
  const port = yield* Config.Port("PORT")
  const debug = yield* Config.Boolean("DEBUG")
  const retries = yield* Config.Int("RETRIES")
  const rate = yield* Config.Number("RATE")
  return { port, debug, retries, rate }
})
//#exercise
const settings: Effect.Effect<{ port: number; debug: boolean; retries: number; rate: number }, Config.ConfigError> = todo()
//#end

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ PORT: "8080", DEBUG: "true", RETRIES: "3", RATE: "0.5" }))
check("settings", await Effect.runPromise(settings.pipe(Effect.provide(provider))), { port: 8080, debug: true, retries: 3, rate: 0.5 })
