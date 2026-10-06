/**
 * Bounded queues make producers wait. A dropping queue refuses instead:
 * when it is full, offer returns false and the value is discarded. Good for
 * "latest is not important" traffic like metrics.
 *
 *   Queue.dropping<A>(n)   Queue.offer returns a boolean
 *   Queue.takeAll(queue)   take everything currently in the queue
 *
 * Goal: offer 1, 2, 3 to a dropping queue of size 2. Return whether each
 * was accepted, and what the queue ended up holding.
 */
// I AM NOT DONE
import { Effect, Queue } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const program: Effect.Effect<{ accepted: Array<boolean>; kept: ReadonlyArray<number> }> = todo()

check("accepted", (await Effect.runPromise(program)).accepted, [true, true, false])
check("kept", [...(await Effect.runPromise(program)).kept], [1, 2])
