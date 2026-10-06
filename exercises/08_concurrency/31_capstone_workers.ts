/**
 * Bring the chapter together.
 *
 * processAll(jobs) doubles every job and returns the sum of the doubled
 * values. It does the work with two worker fibers that share one queue of
 * jobs, and adds results into a shared Ref. The number of jobs is even, so
 * each worker takes exactly half.
 */
// I AM NOT DONE
import { Effect, Fiber, Queue, Ref } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const processAll = (jobs: ReadonlyArray<number>): Effect.Effect<number> => todo()

check("sum of doubled jobs", await Effect.runPromise(processAll([1, 2, 3, 4, 5, 6])), 42)
check("no jobs", await Effect.runPromise(processAll([])), 0)
