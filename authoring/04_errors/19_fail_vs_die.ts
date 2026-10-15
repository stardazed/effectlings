//#title Failures and defects
//#kind complete
//#teaches Effect.die, Cause.hasFails, Cause.hasDies
//#hint Bad user input is expected, so it is a failure. An impossible state is a bug, so it is a defect.
//#hint Effect.fail(new InvalidInput({ field: "email" })) and Effect.die("unreachable state")
/**
 * A program can go wrong in two different ways.
 *
 *   failure   an expected problem the caller may want to handle.
 *             It is listed in E:   Effect.fail(new InvalidInput(...))
 *   defect    a bug or an impossible state. Not listed in E:
 *                                  Effect.die("unreachable state")
 *
 * A defect skips every catch and catchTag handler. It means: this is not
 * something the code planned for.
 *
 * Cause.hasFails(cause) and Cause.hasDies(cause) tell the two apart.
 *
 * Goal: define one program of each kind. `invalidInput` is what happens
 * when a user types a bad email. `impossible` is what happens when the
 * code reaches a branch that should never be reached.
 */
import { Cause, Data, Effect, Exit } from "effect"

class InvalidInput extends Data.TaggedError("InvalidInput")<{ readonly field: string }> {}

//#solution
const invalidInput: Effect.Effect<never, InvalidInput> = Effect.fail(new InvalidInput({ field: "email" }))
const impossible: Effect.Effect<never> = Effect.die("unreachable state")
//#exercise
const invalidInput: Effect.Effect<never, InvalidInput> = todo()
const impossible: Effect.Effect<never> = todo()
//#end

const kind = async (program: Effect.Effect<unknown, unknown>) => {
  const exit = await Effect.runPromiseExit(program)
  return Exit.isFailure(exit)
    ? { fails: Cause.hasFails(exit.cause), dies: Cause.hasDies(exit.cause) }
    : { fails: false, dies: false }
}

check("invalidInput is a failure", await kind(invalidInput), { fails: true, dies: false })
check("impossible is a defect", await kind(impossible), { fails: false, dies: true })
