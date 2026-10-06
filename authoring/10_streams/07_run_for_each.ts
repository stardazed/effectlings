//#title Doing something with every value
//#kind complete
//#teaches Stream.runForEach, Stream.runDrain
//#hint runForEach takes a function returning an Effect for each value. runDrain runs the stream and discards values.
//#hint Stream.runForEach((n) => Effect.sync(() => { seen.push(n) })) and stream.pipe(Stream.tap(...), Stream.runDrain)
/**
 *   Stream.runForEach(f)   run f (an Effect) for each value
 *   Stream.runDrain        run the stream for its effects, ignoring the values
 *
 * Goal: record every value in `seen`, once with runForEach and once with
 * tap followed by runDrain.
 */
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const seen: Array<string> = []
const record = (label: string) => (n: number) => Effect.sync(() => { seen.push(`${label}${n}`) })

//#solution
const viaForEach: Effect.Effect<void> = Stream.make(1, 2).pipe(Stream.runForEach(record("a")))
const viaDrain: Effect.Effect<void> = Stream.make(1, 2).pipe(Stream.tap(record("b")), Stream.runDrain)
//#exercise
const viaForEach: Effect.Effect<void> = todo()
const viaDrain: Effect.Effect<void> = todo()
//#end

await Effect.runPromise(viaForEach)
await Effect.runPromise(viaDrain)
check("seen", seen, ["a1", "a2", "b1", "b2"])
