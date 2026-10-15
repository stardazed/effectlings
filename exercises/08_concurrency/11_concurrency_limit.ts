/**
 * A number for `concurrency` caps how many run at once. It is the simplest
 * way to be polite to a server or a database.
 *
 * Goal: run `work` over the numbers with at most 2 in flight.
 */
// I AM NOT DONE
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

const run = (ns: ReadonlyArray<number>): Effect.Effect<Array<number>> => todo()

check("results in input order", await Effect.runPromise(run([1, 2, 3, 4])), [10, 20, 30, 40])
check("never more than two at once", maxActive, 2)
