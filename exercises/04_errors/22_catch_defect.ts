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
// I AM NOT DONE
import { Effect } from "effect"
import { causeKind, check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const bug: Effect.Effect<never> = Effect.die("bug in the pricing table")

const survived: Effect.Effect<string> = todo()

const notHandled = bug.pipe(Effect.catch(() => Effect.succeed("caught")))
check("catch does not see defects", await causeKind(notHandled), { fails: false, dies: true })
check("catchDefect does", await Effect.runPromise(survived), "recovered from: bug in the pricing table")
