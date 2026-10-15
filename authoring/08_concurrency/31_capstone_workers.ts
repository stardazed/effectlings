//#title Capstone: a pool of workers
//#kind complete
//#deepens Queue.unbounded, Queue.offerAll, Queue.take, Ref.make, Ref.update, Ref.get, Effect.forkChild, Fiber.join
//#hint Put the jobs in the queue, fork two workers that each take half of them, join both, read the Ref.
//#hint Each worker: for (let i = 0; i < perWorker; i++) { const job = yield* Queue.take(queue); yield* Ref.update(total, (n) => n + job * 2) }
/**
 * Bring the chapter together.
 *
 * processAll(jobs) doubles every job and returns the sum of the doubled
 * values. It does the work with two worker fibers that share one queue of
 * jobs, and adds results into a shared Ref. The number of jobs is even, so
 * each worker takes exactly half.
 */
import { Effect, Fiber, Queue, Ref } from "effect"

//#solution
const processAll = (jobs: ReadonlyArray<number>): Effect.Effect<number> =>
  Effect.gen(function*() {
    const queue = yield* Queue.unbounded<number>()
    const total = yield* Ref.make(0)
    yield* Queue.offerAll(queue, jobs)
    const perWorker = jobs.length / 2
    const worker = Effect.gen(function*() {
      for (let i = 0; i < perWorker; i++) {
        const job = yield* Queue.take(queue)
        yield* Effect.sleep("1 millis")
        yield* Ref.update(total, (n) => n + job * 2)
      }
    })
    const first = yield* Effect.forkChild(worker)
    const second = yield* Effect.forkChild(worker)
    yield* Fiber.join(first)
    yield* Fiber.join(second)
    return yield* Ref.get(total)
  })
//#exercise
const processAll = (jobs: ReadonlyArray<number>): Effect.Effect<number> => todo()
//#end

check("sum of doubled jobs", await Effect.runPromise(processAll([1, 2, 3, 4, 5, 6])), 42)
check("no jobs", await Effect.runPromise(processAll([])), 0)
