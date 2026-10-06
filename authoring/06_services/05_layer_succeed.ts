//#title Layers: recipes for services
//#kind complete
//#teaches Layer.succeed, Layer.Layer, Effect.provide
//#hint Layer.succeed takes the service class and an implementation.
//#hint Layer.succeed(Logger, Logger.of({ log: ... })) and program.pipe(Effect.provide(loggerLayer))
/**
 * provideService hands over one implementation directly. A Layer is a
 * reusable recipe for building services, and it is how real applications
 * wire things up.
 *
 *   Layer.succeed(Service, implementation)    a layer that provides Service
 *   Effect.provide(layer)                     give a layer to a program
 *
 * The type Layer.Layer<Logger> reads: "a layer that provides Logger".
 * After Effect.provide(loggerLayer), the program no longer needs Logger.
 *
 * Goal: write a layer that records lines, and use it to make `program` runnable.
 */
import { Context, Effect, Layer } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Logger extends Context.Service<Logger, {
  readonly log: (line: string) => Effect.Effect<void>
}>()("Logger") {}

const program = Effect.gen(function*() {
  const logger = yield* Logger
  yield* logger.log("hello")
  return "ok"
})

const recorded: Array<string> = []

//#solution
const loggerLayer: Layer.Layer<Logger> = Layer.succeed(
  Logger,
  Logger.of({ log: (line) => Effect.sync(() => { recorded.push(line) }) })
)
const runnable = program.pipe(Effect.provide(loggerLayer))
//#exercise
const loggerLayer: Layer.Layer<Logger> = todo()
const runnable: Effect.Effect<string> = todo()
//#end

check("result", Effect.runSync(runnable), "ok")
check("recorded", recorded, ["hello"])
