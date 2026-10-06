//#title Batching
//#kind complete
//#teaches Stream.grouped
//#hint grouped takes the batch size. The last batch may be smaller.
//#hint Stream.grouped(2)
/**
 * Stream.grouped(n) collects values into arrays of at most n. It is how you
 * turn a stream of single rows into batches for a bulk insert.
 *
 * Goal: batches of 2.
 */
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const batches: Effect.Effect<Array<ReadonlyArray<number>>> = Stream.range(1, 5).pipe(
  Stream.grouped(2),
  Stream.runCollect
)
//#exercise
const batches: Effect.Effect<Array<ReadonlyArray<number>>> = todo()
//#end

check("batches", await Effect.runPromise(batches), [[1, 2], [3, 4], [5]])
