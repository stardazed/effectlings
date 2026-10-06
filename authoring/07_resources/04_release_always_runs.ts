//#title What happens when use fails?
//#kind complete
//#deepens Effect.acquireUseRelease, Effect.gen, Effect.fail
//#hint Follow the three phases. Does a failure in use skip the release?
//#hint open, then use (which fails), then close. The release still runs.
/**
 * Predict the log. The use phase logs "use" and then fails.
 * Write your prediction in `expected`, then confirm by running.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []

const program = Effect.acquireUseRelease(
  Effect.sync(() => { log.push("open") }),
  () =>
    Effect.gen(function*() {
      yield* Effect.sync(() => { log.push("use") })
      return yield* Effect.fail("boom")
    }),
  () => Effect.sync(() => { log.push("close") })
)

await Effect.runPromiseExit(program)

//#solution
const expected: Array<string> = ["open", "use", "close"]
//#exercise
const expected: Array<string> = todo()
//#end

check("log", log, expected)
