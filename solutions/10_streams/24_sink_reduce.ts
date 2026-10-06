/**
 * Sink.reduce(() => initial, f) builds a sink that folds every value.
 * It is the general tool behind sum and count. The type Sink.Sink<A, In>
 * reads: "consumes values of type In and finishes with an A".
 *
 * Goal: a sink for strings that finishes with the length of the longest one.
 */
import { Effect, Sink, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const longest: Sink.Sink<number, string> = Sink.reduce(
  () => 0,
  (longestSoFar: number, word: string) => Math.max(longestSoFar, word.length)
)

check("longest", await Effect.runPromise(Stream.make("a", "banana", "kiwi").pipe(Stream.run(longest))), 6)
check("nothing", await Effect.runPromise(Stream.make<Array<string>>().pipe(Stream.run(longest))), 0)
