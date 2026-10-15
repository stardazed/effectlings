//#title Joining streams
//#kind complete
//#teaches Stream.concat, Stream.zip
//#hint concat plays one stream after the other. zip pairs values up and stops with the shorter stream.
//#hint Stream.concat(a, b) and Stream.zip(a, b)
/**
 *   Stream.concat(a, b)   all of a, then all of b
 *   Stream.zip(a, b)      pairs [fromA, fromB]; ends when either stream ends
 *
 * Goal: join two streams end to end, and pair them up.
 */
import { Effect, Stream } from "effect"

const letters = Stream.make("a", "b", "c")
const numbers = Stream.make(1, 2)

//#solution
const together: Effect.Effect<Array<string>> = Stream.concat(letters, Stream.make("d")).pipe(Stream.runCollect)
const paired: Effect.Effect<Array<readonly [string, number]>> = Stream.zip(letters, numbers).pipe(Stream.runCollect)
//#exercise
const together: Effect.Effect<Array<string>> = todo()
const paired: Effect.Effect<Array<readonly [string, number]>> = todo()
//#end

check("concat", await Effect.runPromise(together), ["a", "b", "c", "d"])
check("zip", await Effect.runPromise(paired), [["a", 1], ["b", 2]])
