//#title join or await?
//#kind complete
//#teaches Fiber.await
//#hint Fiber.await gives you the Exit and never fails. Fiber.join fails if the fiber failed.
//#hint outcome: fork, then yield* Fiber.await(fiber). joined: fork, then yield* Fiber.join(fiber).
/**
 * Two ways to wait for a fiber:
 *
 *   Fiber.join(fiber)    the result, or the fiber's failure if it failed
 *   Fiber.await(fiber)   the Exit of the fiber, whatever happened; never fails
 *
 * Use await when you want to inspect the outcome; use join when a failure
 * should flow on as your own.
 *
 * Goal: write outcome (using await) and joined (using join).
 */
import { Effect, Exit, Fiber } from "effect"

//#solution
const outcome = <A, E>(task: Effect.Effect<A, E>): Effect.Effect<Exit.Exit<A, E>> =>
  Effect.gen(function*() {
    const fiber = yield* Effect.forkChild(task)
    return yield* Fiber.await(fiber)
  })

const joined = <A, E>(task: Effect.Effect<A, E>): Effect.Effect<A, E> =>
  Effect.gen(function*() {
    const fiber = yield* Effect.forkChild(task)
    return yield* Fiber.join(fiber)
  })
//#exercise
const outcome = <A, E>(task: Effect.Effect<A, E>): Effect.Effect<Exit.Exit<A, E>> => todo()
const joined = <A, E>(task: Effect.Effect<A, E>): Effect.Effect<A, E> => todo()
//#end

const failing = Effect.fail("x")
check("await of a failed fiber is an Exit", Exit.isFailure(await Effect.runPromise(outcome(failing))), true)
check("await of a good fiber", Exit.isSuccess(await Effect.runPromise(outcome(Effect.succeed(1)))), true)
check("join of a good fiber", await Effect.runPromise(joined(Effect.succeed(1))), 1)
check("join of a failed fiber fails", Exit.isFailure(await Effect.runPromiseExit(joined(failing))), true)
