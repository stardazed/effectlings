/**
 *   Stream.takeWhile(p)   values while p holds; stops at the first that fails it
 *   Stream.takeUntil(p)   values up to AND INCLUDING the first that satisfies p
 *
 * Goal: take while the number is under 4, and take until the number is 4.
 */
import { Effect, Stream } from "effect"

const numbers = Stream.range(1, 10)

const whileSmall: Effect.Effect<Array<number>> = numbers.pipe(Stream.takeWhile((n) => n < 4), Stream.runCollect)
const untilFour: Effect.Effect<Array<number>> = numbers.pipe(Stream.takeUntil((n) => n === 4), Stream.runCollect)

check("while small", await Effect.runPromise(whileSmall), [1, 2, 3])
check("until four", await Effect.runPromise(untilFour), [1, 2, 3, 4])
