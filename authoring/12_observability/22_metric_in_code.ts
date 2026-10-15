//#title Measuring real work
//#kind complete
//#deepens Metric.counter, Metric.update, Metric.value, Effect.tap, Effect.tapError
//#hint Count in tap for successes and tapError for failures.
//#hint Effect.tap(() => Metric.update(..., 1)), Effect.tapError(() => Metric.update(..., 1))
/**
 * Metrics are updated right where things happen. Wrap a task so it counts
 * how often it succeeds and how often it fails, without changing its result.
 *
 * Goal: instrument `task`.
 */
import { Effect, Metric } from "effect"

const succeeded = Metric.counter("tasks_succeeded")
const failed = Metric.counter("tasks_failed")

//#solution
const instrumented = <A, E>(task: Effect.Effect<A, E>): Effect.Effect<A, E> =>
  task.pipe(
    Effect.tap(() => Metric.update(succeeded, 1)),
    Effect.tapError(() => Metric.update(failed, 1))
  )
//#exercise
const instrumented = <A, E>(task: Effect.Effect<A, E>): Effect.Effect<A, E> => todo()
//#end

const program = Effect.gen(function*() {
  yield* instrumented(Effect.succeed(1))
  yield* instrumented(Effect.succeed(2))
  yield* instrumented(Effect.fail("boom")).pipe(Effect.ignore)
  return [(yield* Metric.value(succeeded)).count, (yield* Metric.value(failed)).count]
})

check("successes and failures", await Effect.runPromise(program), [2, 1])
