//#title Translate: a global config object
//#kind translate
//#deepens Context.Service, Layer.succeed, Effect.provide, Effect.fn
//#hint endpoint yields Settings and builds the url. The two layers differ only in the apiUrl they provide.
//#hint Layer.succeed(Settings, Settings.of({ apiUrl: "https://prod.example.com" }))
/**
 * Plain TypeScript:
 *
 *   // settings.ts
 *   export const settings = { apiUrl: "https://prod.example.com" }
 *
 *   // anywhere in the code
 *   function endpoint(path: string): string {
 *     return `${settings.apiUrl}${path}`
 *   }
 *
 * Importing a global makes code hard to test: to change the url you must
 * change the module. As a service, the url is an input that the caller
 * chooses. Write endpoint as an Effect that needs Settings, and two layers
 * for production and for local development.
 */
import { Context, Effect, Layer } from "effect"

class Settings extends Context.Service<Settings, { readonly apiUrl: string }>()("Settings") {}

//#solution
const endpoint: (path: string) => Effect.Effect<string, never, Settings> =
  Effect.fn("endpoint")(function*(path: string) {
    const settings = yield* Settings
    return `${settings.apiUrl}${path}`
  })
const prod: Layer.Layer<Settings> = Layer.succeed(Settings, Settings.of({ apiUrl: "https://prod.example.com" }))
const local: Layer.Layer<Settings> = Layer.succeed(Settings, Settings.of({ apiUrl: "http://localhost:3000" }))
//#exercise
const endpoint: (path: string) => Effect.Effect<string, never, Settings> = todo()
const prod: Layer.Layer<Settings> = todo()
const local: Layer.Layer<Settings> = todo()
//#end

check("prod", Effect.runSync(endpoint("/users").pipe(Effect.provide(prod))), "https://prod.example.com/users")
check("local", Effect.runSync(endpoint("/users").pipe(Effect.provide(local))), "http://localhost:3000/users")
