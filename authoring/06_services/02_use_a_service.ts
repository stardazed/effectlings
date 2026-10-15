//#title Using a service
//#kind complete
//#deepens Context.Service, yield*, Effect.gen
//#hint Yield the service to get it, then call its methods. Yield each method call too, since it returns an Effect.
//#hint const logger = yield* Logger; yield* logger.log("start"); yield* logger.log("end"); return "done"
/**
 * Yielding a service gives you its implementation. Its methods return
 * Effects, which you yield in turn.
 *
 * Goal: write `program`. It logs "start", then "end", and finishes with "done".
 * Notice the type: Effect<string, never, Logger>. The requirement is in the type.
 */
import { Context, Effect } from "effect"

class Logger extends Context.Service<Logger, {
  readonly log: (line: string) => Effect.Effect<void>
}>()("Logger") {}

//#solution
const program: Effect.Effect<string, never, Logger> = Effect.gen(function*() {
  const logger = yield* Logger
  yield* logger.log("start")
  yield* logger.log("end")
  return "done"
})
//#exercise
const program: Effect.Effect<string, never, Logger> = todo()
//#end

const lines: Array<string> = []
const recorder = { log: (line: string) => Effect.sync(() => { lines.push(line) }) }

check("result", Effect.runSync(program.pipe(Effect.provideService(Logger, recorder))), "done")
check("what was logged", lines, ["start", "end"])
