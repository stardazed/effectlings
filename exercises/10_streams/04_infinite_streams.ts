/**
 * Stream.iterate(start, next) produces start, next(start), next(next(start)),
 * and so on, forever. That is fine, because a stream is lazy: values are
 * produced only as they are needed. Stream.take stops the production.
 *
 * Goal: the first six powers of two, starting from 1.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const powersOfTwo: Effect.Effect<Array<number>> = todo()

check("powers of two", await Effect.runPromise(powersOfTwo), [1, 2, 4, 8, 16, 32])
