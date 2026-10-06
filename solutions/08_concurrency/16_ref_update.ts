/**
 *   Ref.update(ref, f)          replace the value with f(value)
 *   Ref.updateAndGet(ref, f)    the same, and return the new value
 *
 * Because the change is done as one step, two fibers updating the same Ref
 * cannot overwrite each other's work.
 *
 * Goal: start at 0, add 1 three times, then add 10 and return the result.
 */
import { Effect, Ref } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const program = Effect.gen(function*() {
  const counter = yield* Ref.make(0)
  yield* Ref.update(counter, (n) => n + 1)
  yield* Ref.update(counter, (n) => n + 1)
  yield* Ref.update(counter, (n) => n + 1)
  return yield* Ref.updateAndGet(counter, (n) => n + 10)
})

check("result", await Effect.runPromise(program), 13)
