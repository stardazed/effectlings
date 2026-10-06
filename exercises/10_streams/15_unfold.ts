/**
 * Stream.unfold(seed, step) builds a stream from a state. step receives
 * the state and returns an Effect of:
 *
 *   [valueToEmit, nextState]     to continue
 *   undefined                    to stop
 *
 * Goal: the squares of 1 to 5.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const squares: Effect.Effect<Array<number>> = todo()

check("squares", await Effect.runPromise(squares), [1, 4, 9, 16, 25])
