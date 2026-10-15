/**
 * Layers are memoized within a single build. If two layers both depend on
 * `base`, and you provide them together, `base` is built once and shared.
 * Two separate Effect.provide calls are two separate builds.
 *
 * Predict how many times `base` is built in each scenario.
 */
import { Context, Effect, Layer } from "effect"

class Base extends Context.Service<Base, { readonly id: number }>()("Base") {}
class A extends Context.Service<A, { readonly a: number }>()("A") {}
class B extends Context.Service<B, { readonly b: number }>()("B") {}

let builds = 0
const base = Layer.effect(Base, Effect.sync(() => Base.of({ id: ++builds })))
const aLayer = Layer.effect(A, Effect.gen(function*() { return A.of({ a: (yield* Base).id }) })).pipe(Layer.provide(base))
const bLayer = Layer.effect(B, Effect.gen(function*() { return B.of({ b: (yield* Base).id }) })).pipe(Layer.provide(base))

const useA = Effect.gen(function*() { return (yield* A).a })
const useB = Effect.gen(function*() { return (yield* B).b })

// Scenario 1: both layers in one provide.
builds = 0
Effect.runSync(Effect.all([useA, useB]).pipe(Effect.provide(Layer.mergeAll(aLayer, bLayer))))
const sharedBuilds = builds

// Scenario 2: each program gets its own provide.
builds = 0
Effect.runSync(Effect.all([useA.pipe(Effect.provide(aLayer)), useB.pipe(Effect.provide(bLayer))]))
const separateBuilds = builds

const expected: { shared: number; separate: number } = { shared: 1, separate: 2 }

check("one provide", sharedBuilds, expected.shared)
check("two provides", separateBuilds, expected.separate)
