/**
 * Effect.fn("name") adds a name for stack traces and tracing. That has a
 * small cost. In hot code paths and library internals you may not want it.
 * Effect.fnUntraced is the same, without the name.
 *
 * Goal: write `square` with fnUntraced.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const one = Effect.succeed(1)

const squarePlusOne: (n: number) => Effect.Effect<number> = todo()

check("squarePlusOne", Effect.runSync(squarePlusOne(4)), 17)
