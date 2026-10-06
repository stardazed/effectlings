/**
 *   Sink.take<A>(n)   keep the first n values, then stop consuming
 *   Sink.count        count the values
 *
 * Goal: the first three values of an endless stream, and the length of a finite one.
 */
// I AM NOT DONE
import { Effect, Sink, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const firstThree: Effect.Effect<ReadonlyArray<number>> = todo()
const howMany: Effect.Effect<number> = todo()

check("first three", [...(await Effect.runPromise(firstThree))], [0, 1, 2])
check("count", await Effect.runPromise(howMany), 3)
