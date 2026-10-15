//#title Succeed is eager, sync is lazy
//#kind fix
//#deepens Effect.succeed, Effect.sync, Effect.runSync
//#hint Effect.succeed(x) receives x already computed, so the increment happens while building.
//#hint Wrap the increment in a function and give it to Effect.sync.
/**
 * Effect.succeed(value) takes a value that already exists. Anything you
 * compute inside its argument runs immediately, while you build the effect.
 * To compute something each time the program runs, give Effect.sync a function.
 *
 * Goal: make `next` produce 1, then 2, on successive runs, and make sure
 * that building it does not touch the counter.
 */
import { Effect } from "effect"

let counter = 0

//#solution
const next = Effect.sync(() => ++counter)
//#exercise
const next = Effect.succeed(++counter)
//#end

check("building it does not count", counter, 0)
check("first run", Effect.runSync(next), 1)
check("second run", Effect.runSync(next), 2)
