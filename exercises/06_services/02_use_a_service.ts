/**
 * Yielding a service gives you its implementation. Its methods return
 * Effects, which you yield in turn.
 *
 * Goal: write `program`. It logs "start", then "end", and finishes with "done".
 * Notice the type: Effect<string, never, Logger>. The requirement is in the type.
 */
// I AM NOT DONE
import { Context, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Logger extends Context.Service<Logger, {
  readonly log: (line: string) => Effect.Effect<void>
}>()("Logger") {}

const program: Effect.Effect<string, never, Logger> = todo()

const lines: Array<string> = []
const recorder = { log: (line: string) => Effect.sync(() => { lines.push(line) }) }

check("result", Effect.runSync(program.pipe(Effect.provideService(Logger, recorder))), "done")
check("what was logged", lines, ["start", "end"])
