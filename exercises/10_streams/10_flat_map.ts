/**
 * Stream.flatMap(f) replaces each value with the stream f returns, and
 * joins them together in order.
 *
 * Goal: replace each number n with n and then n times ten.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"

const expanded: Effect.Effect<Array<number>> = todo()

check("expanded", await Effect.runPromise(expanded), [1, 10, 2, 20, 3, 30])
