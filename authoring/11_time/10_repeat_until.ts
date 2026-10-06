//#title Repeating until a condition
//#kind complete
//#deepens Effect.repeat
//#hint until is a predicate on the SUCCESS value. Repeating stops when it returns true.
//#hint check.pipe(Effect.repeat({ until: (status) => status === "ready" }))
/**
 * repeat also accepts `until`, a predicate on the value each run produced.
 * It keeps running until the predicate is true, then returns that value.
 * Without a schedule there is no waiting between runs.
 *
 * Goal: keep checking until the status is "ready".
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const statuses = ["starting", "starting", "ready", "stopped"]
let index = 0
const checkStatus = Effect.sync(() => statuses[index++])

//#solution
const waitForReady: Effect.Effect<string> = checkStatus.pipe(Effect.repeat({ until: (status) => status === "ready" }))
//#exercise
const waitForReady: Effect.Effect<string> = todo()
//#end

check("result", await Effect.runPromise(waitForReady), "ready")
check("it stopped checking", index, 3)
