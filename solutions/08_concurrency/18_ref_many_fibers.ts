/**
 * Ref updates are atomic, so any number of fibers can update the same Ref
 * and no increment is lost.
 *
 * Goal: countTo(n) starts n fibers that each add one to a shared counter
 * and returns the final count.
 */
import { Effect, Ref } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const countTo = (n: number): Effect.Effect<number> =>
  Effect.gen(function*() {
    const counter = yield* Ref.make(0)
    yield* Effect.forEach(
      Array.from({ length: n }),
      () =>
        Effect.gen(function*() {
          yield* Effect.sleep("1 millis")
          yield* Ref.update(counter, (x) => x + 1)
        }),
      { concurrency: "unbounded" }
    )
    return yield* Ref.get(counter)
  })

check("fifty increments", await Effect.runPromise(countTo(50)), 50)
check("none", await Effect.runPromise(countTo(0)), 0)
