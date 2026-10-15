//#title The first and last value
//#kind complete
//#teaches Stream.runHead, Stream.runLast, Stream.Stream, Stream.empty
//#hint Both give an Option, because the stream might be empty.
//#hint Stream.runHead and Stream.runLast
/**
 *   Stream.runHead   the first value, as an Option (and it stops early)
 *   Stream.runLast   the last value, as an Option
 *
 *   Stream.Stream<A>   the type of a stream of A (like Effect.Effect<A>)
 *   Stream.empty       a stream with no values
 *
 * Goal: the first and the last of a stream.
 */
import { Effect, Option, Stream } from "effect"

//#solution
const first = <A>(stream: Stream.Stream<A>): Effect.Effect<Option.Option<A>> => stream.pipe(Stream.runHead)
const last = <A>(stream: Stream.Stream<A>): Effect.Effect<Option.Option<A>> => stream.pipe(Stream.runLast)
//#exercise
const first = <A>(stream: Stream.Stream<A>): Effect.Effect<Option.Option<A>> => todo()
const last = <A>(stream: Stream.Stream<A>): Effect.Effect<Option.Option<A>> => todo()
//#end

const numbers: Stream.Stream<number> = Stream.make(1, 2, 3)

check("first", await Effect.runPromise(first(numbers)), Option.some(1))
check("last", await Effect.runPromise(last(numbers)), Option.some(3))
check("first of nothing", await Effect.runPromise(first(Stream.empty)), Option.none())
