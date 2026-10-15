//#title Stopping on a condition
//#kind complete
//#teaches Stream.takeWhile, Stream.takeUntil
//#hint takeWhile stops BEFORE the first value that fails. takeUntil keeps the value that satisfies it.
//#hint Stream.takeWhile((n) => n < 4) and Stream.takeUntil((n) => n === 4)
/**
 *   Stream.takeWhile(p)   values while p holds; stops at the first that fails it
 *   Stream.takeUntil(p)   values up to AND INCLUDING the first that satisfies p
 *
 * Goal: take while the number is under 4, and take until the number is 4.
 */
import { Effect, Stream } from "effect"

const numbers = Stream.range(1, 10)

//#solution
const whileSmall: Effect.Effect<Array<number>> = numbers.pipe(Stream.takeWhile((n) => n < 4), Stream.runCollect)
const untilFour: Effect.Effect<Array<number>> = numbers.pipe(Stream.takeUntil((n) => n === 4), Stream.runCollect)
//#exercise
const whileSmall: Effect.Effect<Array<number>> = todo()
const untilFour: Effect.Effect<Array<number>> = todo()
//#end

check("while small", await Effect.runPromise(whileSmall), [1, 2, 3])
check("until four", await Effect.runPromise(untilFour), [1, 2, 3, 4])
