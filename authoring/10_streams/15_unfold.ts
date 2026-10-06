//#title Generating from state
//#kind complete
//#teaches Stream.unfold
//#hint unfold takes a seed and an effectful function returning [value, nextSeed], or undefined to stop.
//#hint Stream.unfold(1, (n) => Effect.succeed(n > 5 ? undefined : [n * n, n + 1] as const))
/**
 * Stream.unfold(seed, step) builds a stream from a state. step receives
 * the state and returns an Effect of:
 *
 *   [valueToEmit, nextState]     to continue
 *   undefined                    to stop
 *
 * Goal: the squares of 1 to 5.
 */
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const squares: Effect.Effect<Array<number>> = Stream.unfold(1, (n) =>
  Effect.succeed(n > 5 ? undefined : ([n * n, n + 1] as const))
).pipe(Stream.runCollect)
//#exercise
const squares: Effect.Effect<Array<number>> = todo()
//#end

check("squares", await Effect.runPromise(squares), [1, 4, 9, 16, 25])
