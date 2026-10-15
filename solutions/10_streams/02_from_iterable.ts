/**
 *   Stream.fromIterable(items)   a stream of the items of an array, Set, Map...
 *   Stream.range(a, b)           the numbers from a to b, both included
 *   Stream.filter(predicate)     keep only matching values
 *
 * Goal: the words longer than 3 letters, and the numbers 1 to 5.
 */
import { Effect, Stream } from "effect"

const longWords = (words: ReadonlyArray<string>): Effect.Effect<Array<string>> =>
  Stream.fromIterable(words).pipe(Stream.filter((w) => w.length > 3), Stream.runCollect)

const oneToFive: Effect.Effect<Array<number>> = Stream.range(1, 5).pipe(Stream.runCollect)

check("long words", await Effect.runPromise(longWords(["an", "apple", "a", "banana"])), ["apple", "banana"])
check("range", await Effect.runPromise(oneToFive), [1, 2, 3, 4, 5])
