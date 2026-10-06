//#title Looking inside a Cause
//#kind complete
//#teaches Effect.catchCause, Cause.isFailReason, Cause.isDieReason
//#hint catchCause sees everything, including defects. The handler receives the whole Cause.
//#hint cause.reasons.some(Cause.isDieReason) asks: is there a defect in here?
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
import { Cause, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

type Outcome = "ok" | "failure" | "defect" | "interrupted"

//#solution
const classify = <A, E>(program: Effect.Effect<A, E>): Effect.Effect<Outcome> =>
  program.pipe(
    Effect.map((): Outcome => "ok"),
    Effect.catchCause((cause) =>
      Effect.succeed<Outcome>(
        cause.reasons.some(Cause.isDieReason)
          ? "defect"
          : cause.reasons.some(Cause.isFailReason)
          ? "failure"
          : "interrupted"
      )
    )
  )
//#exercise
const classify = <A, E>(program: Effect.Effect<A, E>): Effect.Effect<Outcome> => todo()
//#end

check("success", await Effect.runPromise(classify(Effect.succeed(1))), "ok")
check("failure", await Effect.runPromise(classify(Effect.fail("x"))), "failure")
check("defect", await Effect.runPromise(classify(Effect.die("x"))), "defect")
