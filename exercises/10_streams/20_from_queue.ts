/**
 * Queues and streams fit together: a producer offers values, a stream
 * reads them. Stream.fromQueue(queue) needs to know when to stop, so the
 * queue has a second type parameter that includes Cause.Done, and
 * Queue.end(queue) signals "no more values".
 *
 * Goal: put 1, 2, 3 in a queue, end it, and read the values as a stream.
 */
// I AM NOT DONE
import { Cause, Effect, Queue, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const program: Effect.Effect<Array<number>> = todo()

check("values", await Effect.runPromise(program), [1, 2, 3])
