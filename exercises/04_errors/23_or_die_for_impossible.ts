/**
 * parseHex can fail, so its type says so. But when you pass a constant you
 * wrote yourself, a failure would mean the code itself is wrong. Effect.orDie
 * turns that failure into a defect, and E becomes never:
 *
 *   "if this fails, it is a bug, not a case to handle"
 *
 * Goal: `black` parses a valid literal. `broken` parses an invalid one,
 * which is a bug and must die rather than fail.
 */
// I AM NOT DONE
import { Data, Effect } from "effect"
import { causeKind, check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class InvalidHex extends Data.TaggedError("InvalidHex")<{ readonly input: string }> {}

const parseHex = (input: string): Effect.Effect<number, InvalidHex> =>
  /^[0-9a-f]+$/i.test(input) ? Effect.succeed(parseInt(input, 16)) : Effect.fail(new InvalidHex({ input }))

const black: Effect.Effect<number> = todo()
const broken: Effect.Effect<number> = todo()

check("black", await Effect.runPromise(black), 0)
check("broken is a defect, not a failure", await causeKind(broken), { fails: false, dies: true })
