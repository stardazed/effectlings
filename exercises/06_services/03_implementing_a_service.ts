/**
 * An implementation of a service is an ordinary object that matches its
 * shape. `Clock.of({ ... })` is an identity function that only exists to
 * type-check the object. The type of an implementation is Clock["Service"].
 *
 * Because implementations are just objects, swapping them is easy. The same
 * program runs with a fixed clock, or with a ticking one.
 *
 * Goal: write two clocks. `fixedClock` always says 1000. `tickingClock`
 * says 1, then 2, then 3, and so on.
 */
// I AM NOT DONE
import { Context, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Clock extends Context.Service<Clock, {
  readonly now: () => number
}>()("Clock") {}

let tickCount = 0

const fixedClock: Clock["Service"] = todo()
const tickingClock: Clock["Service"] = todo()

const twoReadings = Effect.gen(function*() {
  const clock = yield* Clock
  return [clock.now(), clock.now()]
})

check("fixed", Effect.runSync(twoReadings.pipe(Effect.provideService(Clock, fixedClock))), [1000, 1000])
check("ticking", Effect.runSync(twoReadings.pipe(Effect.provideService(Clock, tickingClock))), [1, 2])
