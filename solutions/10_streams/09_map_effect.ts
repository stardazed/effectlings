/**
 * Stream.mapEffect(f) applies an effectful function to each value. By
 * default it handles one value at a time, in order. Give it
 * `{ concurrency: n }` to work on n values at once; the output order is
 * still the input order.
 *
 * Goal: look every id up, three at a time.
 */
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let active = 0
let maxActive = 0
const lookup = (id: number) =>
  Effect.gen(function*() {
    active += 1
    maxActive = Math.max(maxActive, active)
    yield* Effect.sleep("3 millis")
    active -= 1
    return `user-${id}`
  })

const users: Effect.Effect<Array<string>> = Stream.range(1, 6).pipe(
  Stream.mapEffect(lookup, { concurrency: 3 }),
  Stream.runCollect
)

check("results keep their order", await Effect.runPromise(users), ["user-1", "user-2", "user-3", "user-4", "user-5", "user-6"])
check("three at a time", maxActive, 3)
