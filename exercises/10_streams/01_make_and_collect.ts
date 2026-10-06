/**
 * An Effect produces ONE value. A Stream produces MANY, one after another,
 * possibly forever. Like an Effect, a Stream is only a description: nothing
 * happens until you run it.
 *
 *   Stream.make(1, 2, 3)        a stream of these values
 *   Stream.map(f)               transform each value
 *   Stream.runCollect           run it and gather every value into an array
 *                               (the result is an Effect)
 *
 * Goal: double every number.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const doubled: Effect.Effect<Array<number>> = todo()

check("doubled", await Effect.runPromise(doubled), [2, 4, 6])
