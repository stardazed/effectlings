/**
 * Sharing is usually what you want. When a consumer needs its own private
 * instance (its own connection, its own counter), wrap the dependency in
 * Layer.fresh. It is then built separately for that consumer.
 *
 * Goal: make bLayer get its own copy of `base`, while aLayer keeps
 * the shared one. The two must see different ids.
 */
// I AM NOT DONE
import { Context, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Base extends Context.Service<Base, { readonly id: number }>()("Base") {}
class A extends Context.Service<A, { readonly a: number }>()("A") {}
class B extends Context.Service<B, { readonly b: number }>()("B") {}

let builds = 0
const base = Layer.effect(Base, Effect.sync(() => Base.of({ id: ++builds })))
const aLayer = Layer.effect(A, Effect.gen(function*() { return A.of({ a: (yield* Base).id }) })).pipe(Layer.provide(base))
const bFromBase: Layer.Layer<B, never, Base> = Layer.effect(B, Effect.gen(function*() { return B.of({ b: (yield* Base).id }) }))

const bLayer: Layer.Layer<B> = todo()

const ids = Effect.runSync(
  Effect.all([Effect.gen(function*() { return (yield* A).a }), Effect.gen(function*() { return (yield* B).b })]).pipe(
    Effect.provide(Layer.mergeAll(aLayer, bLayer))
  )
)

check("base was built twice", builds, 2)
check("the consumers saw different instances", ids[0] !== ids[1], true)
