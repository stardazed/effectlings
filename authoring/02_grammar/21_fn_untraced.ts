//#title fnUntraced
//#kind complete
//#teaches Effect.fnUntraced
//#hint It is the same shape as Effect.fn, without the name argument.
//#hint Effect.fnUntraced(function*(n: number) { ... })
/**
 * Effect.fn("name") adds a name for stack traces and tracing. That has a
 * small cost. In hot code paths and library internals you may not want it.
 * Effect.fnUntraced is the same, without the name.
 *
 * Goal: write `square` with fnUntraced.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const one = Effect.succeed(1)

//#solution
const squarePlusOne = Effect.fnUntraced(function*(n: number) {
  const extra = yield* one
  return n * n + extra
})
//#exercise
const squarePlusOne: (n: number) => Effect.Effect<number> = todo()
//#end

check("squarePlusOne", Effect.runSync(squarePlusOne(4)), 17)
