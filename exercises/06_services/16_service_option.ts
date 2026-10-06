/**
 * Sometimes a capability is nice to have but not required. Effect.serviceOption
 * asks for a service and gives an Option instead of adding to R:
 *
 *   some(service)   it was provided
 *   none            it was not, and the program still runs
 *
 * Goal: record a "work" metric when Metrics is provided, and quietly skip it
 * when it is not. The program needs nothing, so its R is never.
 */
// I AM NOT DONE
import { Context, Effect, Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Metrics extends Context.Service<Metrics, {
  readonly count: (name: string) => Effect.Effect<void>
}>()("Metrics") {}

const work: Effect.Effect<string> = todo()

const counted: Array<string> = []
const metrics = { count: (name: string) => Effect.sync(() => { counted.push(name) }) }

check("without Metrics", Effect.runSync(work), "done")
check("nothing counted", counted, [])
check("with Metrics", Effect.runSync(work.pipe(Effect.provideService(Metrics, metrics))), "done")
check("counted", counted, ["work"])
