/**
 * A service class can carry its own constructor. Pass `make` when defining it:
 *
 *   class Cache extends Context.Service<Cache>()("Cache", {
 *     make: Effect.sync(() => ({ ... }))
 *   }) {}
 *
 * The shape of the service is inferred from what `make` produces. It does
 * NOT build a layer for you. You do that yourself, inside the class:
 *
 *   static readonly layer = Layer.effect(this, this.make)
 *
 * Goal: write Cache.layer.
 */
import { Context, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Cache extends Context.Service<Cache>()("Cache", {
  make: Effect.sync(() => {
    const store = new Map<string, string>()
    return {
      get: (key: string): string => store.get(key) ?? "miss",
      set: (key: string, value: string): void => {
        store.set(key, value)
      }
    }
  })
}) {
  static readonly layer = Layer.effect(this, this.make)
}

const program = Effect.gen(function*() {
  const cache = yield* Cache
  const before = cache.get("a")
  cache.set("a", "hit")
  return [before, cache.get("a")]
}).pipe(Effect.provide(Cache.layer))

check("cache", Effect.runSync(program), ["miss", "hit"])
