//#title Sinks that stop early
//#kind complete
//#teaches Sink.take, Sink.count
//#hint Sink.take(n) consumes only n values and then finishes, so an endless stream is fine.
//#hint Stream.iterate(0, (n) => n + 1).pipe(Stream.run(Sink.take<number>(3)))
/**
 *   Sink.take<A>(n)   keep the first n values, then stop consuming
 *   Sink.count        count the values
 *
 * Goal: the first three values of an endless stream, and the length of a finite one.
 */
import { Effect, Sink, Stream } from "effect"

//#solution
const firstThree: Effect.Effect<ReadonlyArray<number>> = Stream.iterate(0, (n) => n + 1).pipe(
  Stream.run(Sink.take<number>(3))
)
const howMany: Effect.Effect<number> = Stream.make("a", "b", "c").pipe(Stream.run(Sink.count))
//#exercise
const firstThree: Effect.Effect<ReadonlyArray<number>> = todo()
const howMany: Effect.Effect<number> = todo()
//#end

check("first three", [...(await Effect.runPromise(firstThree))], [0, 1, 2])
check("count", await Effect.runPromise(howMany), 3)
