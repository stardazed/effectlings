/**
 * So far you ended a stream with a runXxx function. Those are shortcuts.
 * The general form is a Sink: a description of how to CONSUME a stream.
 *
 *   Stream.run(sink)   feed the stream into the sink
 *   Sink.sum           add the numbers
 *   Sink.collect<A>()  keep every value in an array
 *
 * Sinks are values, so you can build them, name them and reuse them.
 *
 * Goal: consume the same stream with two different sinks.
 */
// I AM NOT DONE
import { Effect, Sink, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const numbers = Stream.make(1, 2, 3, 4)

const total: Effect.Effect<number> = todo()
const everything: Effect.Effect<Array<number>> = todo()

check("total", await Effect.runPromise(total), 10)
check("everything", await Effect.runPromise(everything), [1, 2, 3, 4])
