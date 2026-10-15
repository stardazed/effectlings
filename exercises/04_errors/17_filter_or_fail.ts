/**
 * Effect.filterOrFail(predicate, makeError) keeps the value when the
 * predicate is true, and fails with makeError(value) when it is not.
 *
 * Goal: accept ages of 18 or more. Younger ages fail with TooYoung.
 */
// I AM NOT DONE
import { Data, Effect } from "effect"

class TooYoung extends Data.TaggedError("TooYoung")<{ readonly age: number }> {}

const adultAge = (age: number): Effect.Effect<number, TooYoung> => todo()

check("adult", await Effect.runPromise(adultAge(30)), 30)
const error = await rejection(Effect.runPromise(adultAge(12)))
check("minor fails with TooYoung", error instanceof TooYoung, true)
check("with the age", error instanceof TooYoung ? error.age : -1, 12)
