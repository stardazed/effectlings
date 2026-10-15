/**
 * Config.all combines Configs into one, with the same shape idea as
 * Effect.all: pass an object (or array) and get an object (or array) back.
 *
 * Goal: a ServerConfig with a host and a port.
 */
import { ConfigProvider, Config, Effect } from "effect"

const serverConfig: Config.Config<{ host: string; port: number }> = Config.all({ host: Config.String("HOST"), port: Config.Port("PORT") })

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ HOST: "localhost", PORT: "8080" }))
check("config", await Effect.runPromise(serverConfig.pipe(Effect.provide(provider))), { host: "localhost", port: 8080 })
