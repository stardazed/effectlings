/**
 * A Semaphore hands out a limited number of permits.
 *
 *   Semaphore.make(n)                        n permits
 *   Semaphore.withPermits(sem, k)(effect)    run effect while holding k permits
 *
 * With one permit it is a lock: only one job runs its critical section at
 * a time, even if many fibers try at once.
 *
 * Goal: run three jobs concurrently, but never two at the same time.
 */
// I AM NOT DONE
import { Effect, Semaphore } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let active = 0
let maxActive = 0
const job = Effect.gen(function*() {
  active += 1
  maxActive = Math.max(maxActive, active)
  yield* Effect.sleep("3 millis")
  active -= 1
})

const program: Effect.Effect<void> = todo()

await Effect.runPromise(program)
check("never two at once", maxActive, 1)
