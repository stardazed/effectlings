//#title Giving up after a while
//#kind complete
//#teaches Effect.timeout
//#hint timeout takes a duration and adds a TimeoutError to the error channel.
//#hint slow.pipe(Effect.timeout("5 millis"), Effect.catchTag("TimeoutError", () => Effect.succeed("gave up")))
/**
 * Effect.timeout(duration) fails with a TimeoutError if the program takes
 * longer than the duration. The slow program is interrupted.
 *
 * TimeoutError is a tagged error like the ones you wrote, so catchTag works.
 *
 * Goal: give `slow` five milliseconds, and answer "gave up" if it is late.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const slow = Effect.sleep("50 millis").pipe(Effect.as("finished"))

//#solution
const guarded: Effect.Effect<string> = slow.pipe(
  Effect.timeout("5 millis"),
  Effect.catchTag("TimeoutError", () => Effect.succeed("gave up"))
)
//#exercise
const guarded: Effect.Effect<string> = todo()
//#end

check("late", await Effect.runPromise(guarded), "gave up")
check("in time", await Effect.runPromise(Effect.succeed("quick").pipe(Effect.timeout("50 millis"))), "quick")
