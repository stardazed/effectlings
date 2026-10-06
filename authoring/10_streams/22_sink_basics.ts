//#title Sinks: the consumer side
//#kind complete
//#teaches Stream.run, Sink.sum, Sink.collect
//#hint Stream.run takes a Sink and runs the whole stream into it.
//#hint numbers.pipe(Stream.run(Sink.sum)) and numbers.pipe(Stream.run(Sink.collect<number>()))
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
import { Effect, Sink, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const numbers = Stream.make(1, 2, 3, 4)

//#solution
const total: Effect.Effect<number> = numbers.pipe(Stream.run(Sink.sum))
const everything: Effect.Effect<Array<number>> = numbers.pipe(Stream.run(Sink.collect<number>()))
//#exercise
const total: Effect.Effect<number> = todo()
const everything: Effect.Effect<Array<number>> = todo()
//#end

check("total", await Effect.runPromise(total), 10)
check("everything", await Effect.runPromise(everything), [1, 2, 3, 4])
