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
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let ticks = 0
const tick = Effect.sync(() => ++ticks)

const threeTimes: Effect.Effect<number> = todo()

check("the last value", await Effect.runPromise(threeTimes), 3)
check("ticks", ticks, 3)
