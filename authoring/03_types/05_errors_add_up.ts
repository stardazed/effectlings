//#title Errors add up
//#kind fix
//#deepens Effect.Error, Effect.gen, Effect.fail, Effect.runPromiseExit, Exit.isFailure
//#hint Yielding two effects that fail differently gives you both failures.
//#hint Change `Failure` to "timeout" | 404.
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

//#solution
type Failure = "timeout" | 404
//#exercise
type Failure = never
//#end

export type Test = Expect<Equal<Effect.Error<typeof program>, Failure>>

check("it fails at the first step", Exit.isFailure(await Effect.runPromiseExit(program)), true)
