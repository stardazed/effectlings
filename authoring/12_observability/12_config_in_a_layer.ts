//#title Services that configure themselves
//#kind complete
//#deepens Layer.effect, Context.Service, Config.Port, Config.String, Effect.provide
//#hint Read the config inside the generator you give to Layer.effect, then build the service from it.
//#hint Layer.effect(Server, Effect.gen(function*() { const host = yield* Config.String("HOST"); const port = yield* Config.Port("PORT"); return Server.of({ address: `${host}:${port}` }) }))
/**
 * The usual place to read configuration is inside the layer that builds a
 * service. The service then exposes plain values, and nothing else in the
 * program needs to know about Config. The layer's error type gains
 * ConfigError, and its requirements stay empty (the provider has a default).
 *
 * Goal: Server.layer reads HOST and PORT.
 */
import { ConfigProvider, Config, Context, Effect, Layer } from "effect"

class Server extends Context.Service<Server, { readonly address: string }>()("Server") {
//#solution
  static readonly layer: Layer.Layer<Server, Config.ConfigError> = Layer.effect(
    Server,
    Effect.gen(function*() {
      const host = yield* Config.String("HOST")
      const port = yield* Config.Port("PORT")
      return Server.of({ address: `${host}:${port}` })
    })
  )
//#exercise
  static readonly layer: Layer.Layer<Server, Config.ConfigError> = todo()
//#end
}

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ HOST: "localhost", PORT: "8080" }))
const program = Server.useSync((s) => s.address).pipe(Effect.provide(Server.layer), Effect.provide(provider))

check("address", await Effect.runPromise(program), "localhost:8080")
