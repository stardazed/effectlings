/**
 * Effect.updateService(Service, f) runs a program with a modified copy of a
 * service. Everything outside that program still sees the original.
 *
 * Goal: greet with the prefix "child" inside `nested`. The outer greetings
 * keep the prefix "root".
 */
import { Context, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Settings extends Context.Service<Settings, { readonly prefix: string }>()("Settings") {}

const greet = Effect.gen(function*() {
  const settings = yield* Settings
  return `${settings.prefix}: hello`
})

const nested = greet.pipe(Effect.updateService(Settings, (s) => ({ ...s, prefix: "child" })))

const all = Effect.all([greet, nested, greet]).pipe(Effect.provideService(Settings, { prefix: "root" }))
check("greetings", Effect.runSync(all), ["root: hello", "child: hello", "root: hello"])
