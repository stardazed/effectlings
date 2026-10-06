//#title Several settings at once
//#kind complete
//#teaches Config.all
//#hint Config.all takes an object of Configs, like Effect.all.
//#hint Config.all({ host: Config.String("HOST"), port: Config.Port("PORT") })
/**
 * Config.all combines Configs into one, with the same shape idea as
 * Effect.all: pass an object (or array) and get an object (or array) back.
 *
 * Goal: a ServerConfig with a host and a port.
 */
import { ConfigProvider, Config, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const serverConfig = Config.all({ host: Config.String("HOST"), port: Config.Port("PORT") })
//#exercise
const serverConfig: Config.Config<{ host: string; port: number }> = todo()
//#end

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ HOST: "localhost", PORT: "8080" }))
check("config", await Effect.runPromise(serverConfig.pipe(Effect.provide(provider))), { host: "localhost", port: 8080 })
