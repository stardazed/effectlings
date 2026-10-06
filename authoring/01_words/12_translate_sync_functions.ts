//#title Translate: plain functions
//#kind translate
//#deepens Effect.sync, Effect.try
//#hint Which one can throw? That one needs try, the other needs sync.
//#hint sync for double, try for mustBePositive.
//#hint catch: (error) => (error instanceof Error ? error.message : String(error)), the same narrowing as in the tryPromise exercise.
/**
 * Plain TypeScript you might already have:
 *
 *   const double = (n: number): number => n * 2
 *
 *   const mustBePositive = (n: number): number => {
 *     if (n <= 0) throw new Error("not positive")
 *     return n
 *   }
 *
 * Both functions exist below. Expose them as Effects. Choose the constructor
 * by asking: can this code throw?
 */
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const double = (n: number): number => n * 2
const mustBePositive = (n: number): number => {
  if (n <= 0) throw new Error("not positive")
  return n
}

//#solution
const doubleEffect = (n: number): Effect.Effect<number> => Effect.sync(() => double(n))
const positiveEffect = (n: number): Effect.Effect<number, string> =>
  Effect.try({
    try: () => mustBePositive(n),
    catch: (error) => (error instanceof Error ? error.message : String(error))
  })
//#exercise
const doubleEffect = (n: number): Effect.Effect<number> => todo()
const positiveEffect = (n: number): Effect.Effect<number, string> => todo()
//#end

check("double", Effect.runSync(doubleEffect(4)), 8)
check("positive ok", Effect.runSync(positiveEffect(3)), 3)
check("positive fails", await rejection(Effect.runPromise(positiveEffect(-1))), "not positive")
