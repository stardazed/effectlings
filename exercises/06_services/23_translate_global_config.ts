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
// I AM NOT DONE
import { Context, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Settings extends Context.Service<Settings, { readonly apiUrl: string }>()("Settings") {}

const endpoint: (path: string) => Effect.Effect<string, never, Settings> = todo()
const prod: Layer.Layer<Settings> = todo()
const local: Layer.Layer<Settings> = todo()

check("prod", Effect.runSync(endpoint("/users").pipe(Effect.provide(prod))), "https://prod.example.com/users")
check("local", Effect.runSync(endpoint("/users").pipe(Effect.provide(local))), "http://localhost:3000/users")
