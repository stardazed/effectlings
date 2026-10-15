/**
 * When a generator yields several effects, the program's E is the union
 * of all their errors. That is how Effect tracks "this can fail in
 * exactly these ways".
 *
 * `"timeout" as const` keeps the literal type "timeout" instead of
 * widening it to string.
 *
 * Goal: fix `Failure`.
 */
import { Effect, Exit } from "effect"

const timeout = Effect.fail("timeout" as const)
const notFound = Effect.fail(404 as const)

const program = Effect.gen(function*() {
  yield* timeout
  yield* notFound
  return "done"
})

type Failure = "timeout" | 404

export type Test = Expect<Equal<Effect.Error<typeof program>, Failure>>

check("it fails at the first step", Exit.isFailure(await Effect.runPromiseExit(program)), true)
