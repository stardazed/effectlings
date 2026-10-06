/**
 *   Sink.take<A>(n)   keep the first n values, then stop consuming
 *   Sink.count        count the values
 *
 * Goal: the first three values of an endless stream, and the length of a finite one.
 */
import { Effect, Sink, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const firstThree: Effect.Effect<ReadonlyArray<number>> = Stream.iterate(0, (n) => n + 1).pipe(
  Stream.run(Sink.take<number>(3))
)
const howMany: Effect.Effect<number> = Stream.make("a", "b", "c").pipe(Stream.run(Sink.count))

check("first three", [...(await Effect.runPromise(firstThree))], [0, 1, 2])
check("count", await Effect.runPromise(howMany), 3)
