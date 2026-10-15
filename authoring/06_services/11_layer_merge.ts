//#title Combining independent layers
//#kind complete
//#teaches Layer.merge, Layer.mergeAll
//#hint merge takes two layers. mergeAll takes any number.
//#hint Layer.merge(clockLayer, loggerLayer) and Layer.mergeAll(clockLayer, loggerLayer, idsLayer)
/**
 * Layers that do not depend on each other are combined with merge:
 *
 *   Layer.merge(a, b)            provides what a and b provide
 *   Layer.mergeAll(a, b, c, ...) the same, for any number of layers
 *
 * Goal: build `two` from clock and logger, and `three` from all three.
 */
import { Context, Effect, Layer } from "effect"

class Clock extends Context.Service<Clock, { readonly now: () => number }>()("Clock") {}
class Logger extends Context.Service<Logger, { readonly tag: string }>()("Logger") {}
class Ids extends Context.Service<Ids, { readonly next: () => string }>()("Ids") {}

const clockLayer = Layer.succeed(Clock, Clock.of({ now: () => 5 }))
const loggerLayer = Layer.succeed(Logger, Logger.of({ tag: "app" }))
const idsLayer = Layer.succeed(Ids, Ids.of({ next: () => "id-1" }))

//#solution
const two: Layer.Layer<Clock | Logger> = Layer.merge(clockLayer, loggerLayer)
const three: Layer.Layer<Clock | Logger | Ids> = Layer.mergeAll(clockLayer, loggerLayer, idsLayer)
//#exercise
const two: Layer.Layer<Clock | Logger> = todo()
const three: Layer.Layer<Clock | Logger | Ids> = todo()
//#end

const program = Effect.gen(function*() {
  const clock = yield* Clock
  const logger = yield* Logger
  const ids = yield* Ids
  return `${logger.tag}:${ids.next()}@${clock.now()}`
})

check("two layers", Effect.runSync(Effect.gen(function*() { return (yield* Clock).now() + (yield* Logger).tag.length }).pipe(Effect.provide(two))), 8)
check("three layers", Effect.runSync(program.pipe(Effect.provide(three))), "app:id-1@5")
