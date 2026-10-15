//#title Changing the error with mapError
//#kind complete
//#teaches Effect.mapError
//#hint mapError is to E what map is to A.
//#hint lookup.pipe(Effect.mapError((e) => ...))
/**
 * Effect.mapError(f) transforms the error of a program, leaving the
 * success alone. It is map for the E slot.
 *
 *   program.pipe(Effect.mapError((error) => newError))
 *
 * Goal: turn the string error into an Error whose message is
 * "user not found".
 */
import { Effect } from "effect"

const lookup: Effect.Effect<number, "not found"> = Effect.fail("not found")

//#solution
const friendly: Effect.Effect<number, Error> = lookup.pipe(Effect.mapError((e) => new Error(`user ${e}`)))
//#exercise
const friendly: Effect.Effect<number, Error> = todo()
//#end

export type Test = Expect<Equal<Effect.Error<typeof friendly>, Error>>

const failure = await rejection(Effect.runPromise(friendly))
check("it is an Error", failure instanceof Error, true)
check("message", failure instanceof Error ? failure.message : "", "user not found")
