/**
 *   Stream.takeWhile(p)   values while p holds; stops at the first that fails it
 *   Stream.takeUntil(p)   values up to AND INCLUDING the first that satisfies p
 *
 * Goal: take while the number is under 4, and take until the number is 4.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const numbers = Stream.range(1, 10)

const whileSmall: Effect.Effect<Array<number>> = todo()
const untilFour: Effect.Effect<Array<number>> = todo()

check("while small", await Effect.runPromise(whileSmall), [1, 2, 3])
check("until four", await Effect.runPromise(untilFour), [1, 2, 3, 4])
