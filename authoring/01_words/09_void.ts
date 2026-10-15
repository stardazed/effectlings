//#title A program that returns nothing
//#kind complete
//#teaches Effect.void
//#hint It is a value, not a function. No parentheses.
//#hint const done = Effect.void
/**
 * Effect.void is a program that does nothing and finishes with undefined.
 * Its type is Effect<void>. Use it as a placeholder when a branch has
 * nothing to do.
 *
 * Goal: define `done`.
 */
import { Effect } from "effect"

//#solution
const done: Effect.Effect<void> = Effect.void
//#exercise
const done: Effect.Effect<void> = todo()
//#end

check("finishes with undefined", Effect.runSync(done), undefined)
