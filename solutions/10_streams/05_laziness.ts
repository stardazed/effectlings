/**
 * Stream.tap(f) runs an effect for every value, without changing it.
 * Because streams are lazy, values that nobody asks for are never produced.
 *
 * Predict how many values the tap sees.
 */
import { Effect, Stream } from "effect"

const seen: Array<number> = []

await Effect.runPromise(
  Stream.iterate(1, (n) => n + 1).pipe(
    Stream.tap((n) => Effect.sync(() => { seen.push(n) })),
    Stream.take(3),
    Stream.runCollect
  )
)

const expected: Array<number> = [1, 2, 3]

check("what the tap saw", seen, expected)
