/**
 * A Config is an Effect whose error type is ConfigError. It is a tagged
 * error like any other, so catchTag("ConfigError", ...) handles it.
 *
 * Goal: use the port from the configuration, or 3000 when it cannot be read.
 */
import { ConfigProvider, Config, Effect } from "effect"

const portOrDefault: Effect.Effect<number> = Config.Port("PORT").pipe(
  Effect.catchTag("ConfigError", () => Effect.succeed(3000))
)

const using = (values: unknown) => portOrDefault.pipe(Effect.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(values))))

check("valid", await Effect.runPromise(using({ PORT: "8080" })), 8080)
check("missing", await Effect.runPromise(using({})), 3000)
check("out of range", await Effect.runPromise(using({ PORT: "99999" })), 3000)
