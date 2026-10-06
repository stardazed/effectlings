/**
 * The usual place to read configuration is inside the layer that builds a
 * service. The service then exposes plain values, and nothing else in the
 * program needs to know about Config. The layer's error type gains
 * ConfigError, and its requirements stay empty (the provider has a default).
 *
 * Goal: Server.layer reads HOST and PORT.
 */
// I AM NOT DONE
import { ConfigProvider, Config, Context, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Server extends Context.Service<Server, { readonly address: string }>()("Server") {
  static readonly layer: Layer.Layer<Server, Config.ConfigError> = todo()
}

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ HOST: "localhost", PORT: "8080" }))
const program = Server.useSync((s) => s.address).pipe(Effect.provide(Server.layer), Effect.provide(provider))

check("address", await Effect.runPromise(program), "localhost:8080")
