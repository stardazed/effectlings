/**
 *   Stream.take(n)   only the first n values (then the stream stops)
 *   Stream.drop(n)   skip the first n values
 *
 * Goal: from the numbers 1 to 10, skip two and keep the next three.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const middle: Effect.Effect<Array<number>> = todo()

check("middle", await Effect.runPromise(middle), [3, 4, 5])
