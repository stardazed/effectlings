/**
 * When a program ends badly, the record of why is a Cause. It holds a list
 * of reasons in `cause.reasons`. Each reason is one of:
 *
 *   Fail       an expected failure (has .error)
 *   Die        a defect            (has .defect)
 *   Interrupt  cancelled           (you will meet it in the concurrency chapter)
 *
 * Effect.catchCause(handler) receives the Cause for any failure or defect.
 * Cause.isFailReason and Cause.isDieReason test one reason.
 *
 * Goal: classify a program as "ok", "failure", "defect" or "interrupted".
 */
// I AM NOT DONE
import { Cause, Effect } from "effect"

type Outcome = "ok" | "failure" | "defect" | "interrupted"

const classify = <A, E>(program: Effect.Effect<A, E>): Effect.Effect<Outcome> => todo()

check("success", await Effect.runPromise(classify(Effect.succeed(1))), "ok")
check("failure", await Effect.runPromise(classify(Effect.fail("x"))), "failure")
check("defect", await Effect.runPromise(classify(Effect.die("x"))), "defect")
