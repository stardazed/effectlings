//#title Nothing runs until you run it
//#kind complete
//#teaches Effect.sync
//#hint Effect.sync takes a function. Put the counter update inside it.
//#hint Effect.sync(() => { calls += 1 })
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

//#solution
const bump = Effect.sync(() => {
  calls += 1
})
//#exercise
const bump = todo() // a program that adds one to `calls`
//#end

check("building it runs nothing", calls, 0)
Effect.runSync(bump)
check("after one run", calls, 1)
Effect.runSync(bump)
check("after a second run", calls, 2)
