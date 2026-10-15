/**
 * Plain TypeScript:
 *
 *   async function* numbers() { yield 1; yield 2; yield 3 }
 *
 *   const out: number[] = []
 *   for await (const n of numbers()) out.push(n * 2)
 *
 * Stream.fromAsyncIterable(iterable, onError) wraps any async iterable.
 * `onError` turns whatever the iterable throws into the stream's error type,
 * the same job as `catch` in Effect.tryPromise.
 *
 * Goal: the doubled numbers, as a stream collected into an array.
 */
import { Effect, Stream } from "effect"

async function* numbers(): AsyncGenerator<number> {
  yield 1
  yield 2
  yield 3
}

const doubled: Effect.Effect<Array<number>, string> = Stream.fromAsyncIterable(numbers(), () => "stream failed").pipe(
  Stream.map((n) => n * 2),
  Stream.runCollect
)

check("doubled", await Effect.runPromise(doubled), [2, 4, 6])
