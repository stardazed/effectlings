/**
 * The classic shape: one fiber produces values, another consumes them, and
 * a queue sits between them.
 *
 * Goal: a consumer fiber takes three numbers from the queue and returns
 * their sum. The main fiber produces 1, 2 and 3, then joins the consumer.
 */
// I AM NOT DONE
import { Effect, Fiber, Queue } from "effect"

const program: Effect.Effect<number> = todo()

check("sum", await Effect.runPromise(program), 6)
