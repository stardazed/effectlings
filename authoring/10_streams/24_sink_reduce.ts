//#title Your own sink
//#kind complete
//#teaches Sink.reduce, Sink.Sink
//#hint Sink.reduce takes a function returning the start value and a function combining state and input.
//#hint Sink.reduce(() => 0, (longest: number, word: string) => Math.max(longest, word.length))
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

//#solution
const longest: Sink.Sink<number, string> = Sink.reduce(
  () => 0,
  (longestSoFar: number, word: string) => Math.max(longestSoFar, word.length)
)
//#exercise
const longest: Sink.Sink<number, string> = todo()
//#end

check("longest", await Effect.runPromise(Stream.make("a", "banana", "kiwi").pipe(Stream.run(longest))), 6)
check("nothing", await Effect.runPromise(Stream.make<Array<string>>().pipe(Stream.run(longest))), 0)
