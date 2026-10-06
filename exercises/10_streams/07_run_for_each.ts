/**
 *   Stream.runForEach(f)   run f (an Effect) for each value
 *   Stream.runDrain        run the stream for its effects, ignoring the values
 *
 * Goal: record every value in `seen`, once with runForEach and once with
 * tap followed by runDrain.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const seen: Array<string> = []
const record = (label: string) => (n: number) => Effect.sync(() => { seen.push(`${label}${n}`) })

const viaForEach: Effect.Effect<void> = todo()
const viaDrain: Effect.Effect<void> = todo()

await Effect.runPromise(viaForEach)
await Effect.runPromise(viaDrain)
check("seen", seen, ["a1", "a2", "b1", "b2"])
