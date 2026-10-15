/**
 * Stream.grouped(n) collects values into arrays of at most n. It is how you
 * turn a stream of single rows into batches for a bulk insert.
 *
 * Goal: batches of 2.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"

const batches: Effect.Effect<Array<ReadonlyArray<number>>> = todo()

check("batches", await Effect.runPromise(batches), [[1, 2], [3, 4], [5]])
