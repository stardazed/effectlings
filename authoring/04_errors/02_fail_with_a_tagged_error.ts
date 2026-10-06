//#title Failing with a tagged error
//#kind complete
//#deepens Effect.fail, Effect.succeed, Data.TaggedError
//#hint Look the name up first. Fail when it is missing, succeed with a user when it is found.
//#hint const name = names.get(id); return name === undefined ? Effect.fail(new NotFound({ id })) : Effect.succeed({ id, name })
/**
 * The error slot E can now hold a real type. `Effect.Effect<User, NotFound>`
 * reads: "finishes with a User, or fails with a NotFound".
 *
 * Goal: write findUser.
 */
import { Data, Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}

interface User {
  readonly id: number
  readonly name: string
}

const names = new Map([[1, "Ada"], [2, "Grace"]])

//#solution
const findUser = (id: number): Effect.Effect<User, NotFound> => {
  const name = names.get(id)
  return name === undefined ? Effect.fail(new NotFound({ id })) : Effect.succeed({ id, name })
}
//#exercise
const findUser = (id: number): Effect.Effect<User, NotFound> => todo()
//#end

check("known user", await Effect.runPromise(findUser(1)), { id: 1, name: "Ada" })
const error = await rejection(Effect.runPromise(findUser(3)))
check("unknown user fails with NotFound", error instanceof NotFound, true)
check("the error carries the id", error instanceof NotFound ? error.id : -1, 3)
