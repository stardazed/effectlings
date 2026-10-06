/**
 * Annotate a generator with Effect.fn.Return to state its contract.
 * It takes the same three slots as Effect: <A, E, R>.
 *
 *   function*(...): Effect.fn.Return<number, "divide by zero"> { ... }
 *
 * The compiler then checks the body against the contract. One catch:
 * Effect.fail("text") infers the error as plain `string`. Add `as const`
 * to keep the exact literal type.
 *
 * Goal: make the body satisfy the contract.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import type { Equal, Expect } from "../../src/types.ts"

const safeDivide = Effect.fn("safeDivide")(function*(a: number, b: number): Effect.fn.Return<number, "divide by zero"> {
  if (b === 0) return yield* Effect.fail("divide by zero")
  return a / b
})

export type Test = Expect<Equal<typeof safeDivide, (a: number, b: number) => Effect.Effect<number, "divide by zero">>>

check("division", await Effect.runPromise(safeDivide(6, 3)), 2)
check("by zero", await rejection(Effect.runPromise(safeDivide(1, 0))), "divide by zero")
