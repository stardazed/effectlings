//#title Doing it again, on success
//#kind complete
//#teaches Effect.repeat
//#hint repeat takes the same kind of options as retry. times: 2 means two EXTRA runs.
//#hint tick.pipe(Effect.repeat({ times: 2 }))
/**
 * retry runs a program again when it FAILS. repeat runs it again when it
 * SUCCEEDS:
 *
 *   program.pipe(Effect.repeat({ times: 2 }))    first run + 2 more = 3 runs
 *
 * The result is the value of the last run. Any failure stops the repeating.
 *
 * Goal: run `tick` three times in total.
 */
import { Effect } from "effect"

let ticks = 0
const tick = Effect.sync(() => ++ticks)

//#solution
const threeTimes: Effect.Effect<number> = tick.pipe(Effect.repeat({ times: 2 }))
//#exercise
const threeTimes: Effect.Effect<number> = todo()
//#end

check("the last value", await Effect.runPromise(threeTimes), 3)
check("ticks", ticks, 3)
