//#title At most N at a time
//#kind complete
//#deepens Effect.forEach, Effect.sleep
//#hint forEach takes the options object as its third argument.
//#hint Effect.forEach(ns, work, { concurrency: 2 })
/**
 * A number for `concurrency` caps how many run at once. It is the simplest
 * way to be polite to a server or a database.
 *
 * Goal: run `work` over the numbers with at most 2 in flight.
 */
import { Effect } from "effect"

let active = 0
let maxActive = 0
const work = (n: number) =>
  Effect.gen(function*() {
    active += 1
    maxActive = Math.max(maxActive, active)
    yield* Effect.sleep("5 millis")
    active -= 1
    return n * 10
  })

//#solution
const run = (ns: ReadonlyArray<number>): Effect.Effect<Array<number>> => Effect.forEach(ns, work, { concurrency: 2 })
//#exercise
const run = (ns: ReadonlyArray<number>): Effect.Effect<Array<number>> => todo()
//#end

check("results in input order", await Effect.runPromise(run([1, 2, 3, 4])), [10, 20, 30, 40])
check("never more than two at once", maxActive, 2)
