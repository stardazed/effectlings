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

const double = (n: number): number => n * 2
const mustBePositive = (n: number): number => {
  if (n <= 0) throw new Error("not positive")
  return n
}

const doubleEffect = (n: number): Effect.Effect<number> => Effect.sync(() => double(n))
const positiveEffect = (n: number): Effect.Effect<number, string> =>
  Effect.try({
    try: () => mustBePositive(n),
    catch: (error) => (error instanceof Error ? error.message : String(error))
  })

check("double", Effect.runSync(doubleEffect(4)), 8)
check("positive ok", Effect.runSync(positiveEffect(3)), 3)
check("positive fails", await rejection(Effect.runPromise(positiveEffect(-1))), "not positive")
