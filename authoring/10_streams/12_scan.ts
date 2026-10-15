//#title Running totals
//#kind complete
//#teaches Stream.scan
//#hint scan works like fold, but emits every intermediate total, starting with the initial value.
//#hint Stream.scan(() => 0, (total: number, n: number) => total + n)
/**
 * Stream.scan(() => initial, f) is a fold that keeps every step: it emits
 * the initial value, then the value after each input.
 *
 * Goal: the running total of 1, 2, 3, 4.
 */
import { Effect, Stream } from "effect"

//#solution
const runningTotal: Effect.Effect<Array<number>> = Stream.make(1, 2, 3, 4).pipe(
  Stream.scan(() => 0, (total: number, n: number) => total + n),
  Stream.runCollect
)
//#exercise
const runningTotal: Effect.Effect<Array<number>> = todo()
//#end

check("running total", await Effect.runPromise(runningTotal), [0, 1, 3, 6, 10])
