/**
 * A Logger decides what to do with each log line: print it, send it to a
 * server, store it. Writing one is a function:
 *
 *   Logger.make((options) => { ... })   options has logLevel, message, date, cause, fiber
 *   Logger.layer([logger])              a layer that REPLACES the loggers with these
 *
 * (In `options.message`, a single Effect.log("x") arrives as an array ["x"],
 * so String() turns it into "x".)
 *
 * Goal: a logger that stores "<LEVEL>: <message>" lines in `lines`.
 */
import { Effect, Layer, Logger } from "effect"

const lines: Array<string> = []

const collector = Logger.make<unknown, void>((options) => {
  lines.push(`${options.logLevel}: ${String(options.message)}`)
})
const loggerLayer: Layer.Layer<never> = Logger.layer([collector])

const program = Effect.gen(function*() {
  yield* Effect.logInfo("hello")
  yield* Effect.logError("oops")
})

await Effect.runPromise(program.pipe(Effect.provide(loggerLayer)))
check("lines", lines, ["Info: hello", "Error: oops"])
