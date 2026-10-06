/**
 * Stream.flatMap(f) replaces each value with the stream f returns, and
 * joins them together in order.
 *
 * Goal: replace each number n with n and then n times ten.
 */
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const expanded: Effect.Effect<Array<number>> = Stream.make(1, 2, 3).pipe(
  Stream.flatMap((n) => Stream.make(n, n * 10)),
  Stream.runCollect
)

check("expanded", await Effect.runPromise(expanded), [1, 10, 2, 20, 3, 30])
