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

const viaForEach: Effect.Effect<void> = Stream.make(1, 2).pipe(Stream.runForEach(record("a")))
const viaDrain: Effect.Effect<void> = Stream.make(1, 2).pipe(Stream.tap(record("b")), Stream.runDrain)

await Effect.runPromise(viaForEach)
await Effect.runPromise(viaDrain)
check("seen", seen, ["a1", "a2", "b1", "b2"])
