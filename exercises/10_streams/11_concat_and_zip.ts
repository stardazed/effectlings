/**
 *   Stream.concat(a, b)   all of a, then all of b
 *   Stream.zip(a, b)      pairs [fromA, fromB]; ends when either stream ends
 *
 * Goal: join two streams end to end, and pair them up.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const letters = Stream.make("a", "b", "c")
const numbers = Stream.make(1, 2)

const together: Effect.Effect<Array<string>> = todo()
const paired: Effect.Effect<Array<readonly [string, number]>> = todo()

check("concat", await Effect.runPromise(together), ["a", "b", "c", "d"])
check("zip", await Effect.runPromise(paired), [["a", 1], ["b", 2]])
