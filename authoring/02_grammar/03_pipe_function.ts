//#title The pipe function
//#kind complete
//#teaches pipe
//#hint pipe(start, f, g) means g(f(start)).
//#hint pipe(3, double, addOne) and pipe(Effect.succeed(3), Effect.map(double), Effect.map(addOne))
/**
 * `.pipe` exists on Effects. The standalone `pipe` function works on any
 * value, and reads the same way:
 *
 *   pipe(start, f, g, h)     is    h(g(f(start)))
 *
 * Goal: compute 7 from 3 by doubling, then adding one. Do it once on a
 * plain number and once on an Effect.
 */
import { Effect, pipe } from "effect"

const double = (n: number): number => n * 2
const addOne = (n: number): number => n + 1

//#solution
const plain: number = pipe(3, double, addOne)
const effect: Effect.Effect<number> = pipe(Effect.succeed(3), Effect.map(double), Effect.map(addOne))
//#exercise
const plain: number = todo()
const effect: Effect.Effect<number> = todo()
//#end

check("plain", plain, 7)
check("effect", Effect.runSync(effect), 7)
