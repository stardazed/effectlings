/**
 * `.pipe` exists on Effects. The standalone `pipe` function works on any
 * value, and reads the same way:
 *
 *   pipe(start, f, g, h)     is    h(g(f(start)))
 *
 * Goal: compute 7 from 3 by doubling, then adding one. Do it once on a
 * plain number and once on an Effect.
 */
// I AM NOT DONE
import { Effect, pipe } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const double = (n: number): number => n * 2
const addOne = (n: number): number => n + 1

const plain: number = todo()
const effect: Effect.Effect<number> = todo()

check("plain", plain, 7)
check("effect", Effect.runSync(effect), 7)
