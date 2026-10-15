//#title Running things at the same time
//#kind fix
//#deepens Effect.all, Effect.sleep
//#hint Effect.all takes an options object as its second argument.
//#hint Effect.all([...], { concurrency: "unbounded" })
/**
 * Effect.all and Effect.forEach run one item after another by default.
 * Give them `{ concurrency }` to run items in parallel fibers:
 *
 *   Effect.all([a, b, c], { concurrency: "unbounded" })   all at once
 *   Effect.all([a, b, c], { concurrency: 2 })             at most two at a time
 *
 * The results still come back in the original order.
 *
 * Goal: task "a" takes 10ms and task "b" takes 1ms. They should overlap.
 */
import { Effect } from "effect"

const log: Array<string> = []
const task = (name: string, ms: number) =>
  Effect.gen(function*() {
    log.push(`start ${name}`)
    yield* Effect.sleep(`${ms} millis`)
    log.push(`end ${name}`)
    return name
  })

//#solution
const both = Effect.all([task("a", 10), task("b", 1)], { concurrency: "unbounded" })
//#exercise
const both = Effect.all([task("a", 10), task("b", 1)])
//#end

check("results keep their order", await Effect.runPromise(both), ["a", "b"])
check("they overlapped", log, ["start a", "start b", "end b", "end a"])
