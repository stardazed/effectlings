/**
 * Inside a generator, a tagged error can be yielded directly. Yielding one
 * fails the program with it:
 *
 *   return yield* new NotFound({ id })
 *
 * It means the same as `return yield* Effect.fail(new NotFound({ id }))`,
 * just shorter. The `return` tells TypeScript that nothing after it can run.
 *
 * Goal: write withdraw. It fails with Insufficient when the balance is too
 * low, otherwise it finishes with the new balance.
 */
import { Data, Effect } from "effect"

class Insufficient extends Data.TaggedError("Insufficient")<{ readonly needed: number }> {}

const withdraw: (balance: number, amount: number) => Effect.Effect<number, Insufficient> =
  Effect.fn("withdraw")(function*(
    balance: number,
    amount: number
  ): Effect.fn.Return<number, Insufficient> {
    if (amount > balance) return yield* new Insufficient({ needed: amount - balance })
    return balance - amount
  })

check("enough money", await Effect.runPromise(withdraw(100, 30)), 70)
const error = await rejection(Effect.runPromise(withdraw(10, 30)))
check("not enough money", error instanceof Insufficient, true)
check("the shortfall", error instanceof Insufficient ? error.needed : -1, 20)
