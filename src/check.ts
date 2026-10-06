import { inspect, isDeepStrictEqual } from "node:util"
import { Cause, Effect, Exit } from "effect"

/**
 * Compare a value you produced with the value we expect.
 * A mismatch marks the exercise as failed.
 */
export function check<A>(label: string, actual: A, expected: NoInfer<A>): void {
  if (isDeepStrictEqual(actual, expected)) {
    console.log(`  ok    ${label}`)
    return
  }
  process.exitCode = 1
  console.log(`  FAIL  ${label}`)
  console.log(`        expected: ${inspect(expected, { depth: 5 })}`)
  console.log(`        received: ${inspect(actual, { depth: 5 })}`)
}

/** Assert that a condition holds. */
export function checkTrue(label: string, condition: boolean): void {
  check(label, condition, true)
}

/**
 * Resolves with the value a promise rejects with.
 * If the promise resolves instead, resolves with `{ resolvedWith: value }`.
 */
export const rejection = (promise: Promise<unknown>): Promise<unknown> =>
  promise.then((value) => ({ resolvedWith: value }), (error: unknown) => error)

/**
 * Run a program and report whether it ended with an expected failure
 * (`fails`) or a defect (`dies`). Successful programs report neither.
 */
export const causeKind = async (
  program: Effect.Effect<unknown, unknown>
): Promise<{ fails: boolean; dies: boolean }> => {
  const exit = await Effect.runPromiseExit(program)
  return Exit.isFailure(exit)
    ? { fails: Cause.hasFails(exit.cause), dies: Cause.hasDies(exit.cause) }
    : { fails: false, dies: false }
}

/**
 * Call a function and return whatever it throws, or `undefined` when it does not throw.
 */
export const thrown = (f: () => unknown): unknown => {
  try {
    f()
    return undefined
  } catch (error) {
    return error
  }
}
