/**
 * Printing a configuration object into a log is an easy way to leak a
 * password. Config.Redacted reads a setting into a wrapper that hides its
 * content when printed, logged or serialized:
 *
 *   String(secret)           "<redacted>"
 *   Redacted.value(secret)   the real value, only when you ask for it
 *
 * Goal: read the API key redacted, and use the real value only to build an
 * authorization header.
 */
import { ConfigProvider, Config, Effect, Redacted } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const program = Effect.gen(function*() {
  const apiKey = yield* Config.Redacted("API_KEY")
  return { printed: String(apiKey), header: `Bearer ${Redacted.value(apiKey)}` }
})

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ API_KEY: "hunter2" }))
check("secret", await Effect.runPromise(program.pipe(Effect.provide(provider))), {
  printed: "<redacted>",
  header: "Bearer hunter2"
})
