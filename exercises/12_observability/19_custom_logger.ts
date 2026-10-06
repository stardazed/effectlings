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
// I AM NOT DONE
import { Effect, Layer, Logger } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const lines: Array<string> = []

const loggerLayer: Layer.Layer<never> = todo()

const program = Effect.gen(function*() {
  yield* Effect.logInfo("hello")
  yield* Effect.logError("oops")
})

await Effect.runPromise(program.pipe(Effect.provide(loggerLayer)))
check("lines", lines, ["Info: hello", "Error: oops"])
