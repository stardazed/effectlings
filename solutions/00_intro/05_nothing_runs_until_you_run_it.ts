/**
 * Effect.sync(() => ...) describes a program that calls your function
 * each time the program is run. Building the effect calls nothing.
 *
 * Goal: describe a program that adds one to `calls`.
 * The checks show that nothing happens until you run it, and that
 * every run does the work again.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let calls = 0

const bump = Effect.sync(() => {
  calls += 1
})

check("building it runs nothing", calls, 0)
Effect.runSync(bump)
check("after one run", calls, 1)
Effect.runSync(bump)
check("after a second run", calls, 2)
