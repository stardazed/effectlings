/**
 *   Stream.fromIterable(items)   a stream of the items of an array, Set, Map...
 *   Stream.range(a, b)           the numbers from a to b, both included
 *   Stream.filter(predicate)     keep only matching values
 *
 * Goal: the words longer than 3 letters, and the numbers 1 to 5.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"

const longWords = (words: ReadonlyArray<string>): Effect.Effect<Array<string>> => todo()
const oneToFive: Effect.Effect<Array<number>> = todo()

check("long words", await Effect.runPromise(longWords(["an", "apple", "a", "banana"])), ["apple", "banana"])
check("range", await Effect.runPromise(oneToFive), [1, 2, 3, 4, 5])
