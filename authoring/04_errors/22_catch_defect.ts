//#title catch does not see defects
//#kind complete
//#teaches Effect.catchDefect
//#hint Use catchDefect. Its handler receives the defect as unknown.
//#hint bug.pipe(Effect.catchDefect((defect) => ...))
/**
 * Effect.catch and catchTag only handle expected failures. A defect flies
 * right past them. To handle one, use Effect.catchDefect, whose handler
 * receives the defect as `unknown`.
 *
 * Handling defects is rare. It belongs at the edges of a program, such as
 * a request boundary that must not crash the server.
 *
 * Goal: recover from the bug with a message.
 */
import { Effect } from "effect"

const bug: Effect.Effect<never> = Effect.die("bug in the pricing table")

//#solution
const survived: Effect.Effect<string> = bug.pipe(
  Effect.catchDefect((defect) => Effect.succeed(`recovered from: ${String(defect)}`))
)
//#exercise
const survived: Effect.Effect<string> = todo()
//#end

const notHandled = bug.pipe(Effect.catch(() => Effect.succeed("caught")))
check("catch does not see defects", await causeKind(notHandled), { fails: false, dies: true })
check("catchDefect does", await Effect.runPromise(survived), "recovered from: bug in the pricing table")
