/**
 * Effect.filterOrFail(predicate, makeError) keeps the value when the
 * predicate is true, and fails with makeError(value) when it is not.
 *
 * Goal: accept ages of 18 or more. Younger ages fail with TooYoung.
 */
import { Data, Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class TooYoung extends Data.TaggedError("TooYoung")<{ readonly age: number }> {}

const adultAge = (age: number): Effect.Effect<number, TooYoung> =>
  Effect.succeed(age).pipe(Effect.filterOrFail((n) => n >= 18, (n) => new TooYoung({ age: n })))

check("adult", await Effect.runPromise(adultAge(30)), 30)
const error = await rejection(Effect.runPromise(adultAge(12)))
check("minor fails with TooYoung", error instanceof TooYoung, true)
check("with the age", error instanceof TooYoung ? error.age : -1, 12)
