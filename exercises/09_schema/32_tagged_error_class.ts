/**
 * Data.TaggedError, from the errors chapter, is enough for errors that stay
 * inside your program. When an error must also cross a boundary (sent over
 * a network, stored, logged as JSON), define it with a schema:
 *
 *   class InsufficientFunds extends Schema.TaggedError<InsufficientFunds>()(
 *     "InsufficientFunds",
 *     { needed: Schema.Number }
 *   ) {}
 *
 * In your program it behaves the same: you can yield it and catchTag it.
 * It can also be encoded and decoded.
 *
 * Goal: define InsufficientFunds.
 */
// I AM NOT DONE
import { Effect, Schema } from "effect"
import { check } from "../../src/check.ts"

class InsufficientFunds {}

const withdraw = Effect.fn("withdraw")(function*(
  balance: number,
  amount: number
): Effect.fn.Return<number, InsufficientFunds> {
  if (amount > balance) return yield* new InsufficientFunds({ needed: amount - balance })
  return balance - amount
})

const describe = (balance: number, amount: number): Effect.Effect<string> =>
  withdraw(balance, amount).pipe(
    Effect.map((left) => `left ${left}`),
    Effect.catchTag("InsufficientFunds", (e) => Effect.succeed(`need ${e.needed} more`))
  )

check("enough", await Effect.runPromise(describe(10, 3)), "left 7")
check("not enough", await Effect.runPromise(describe(3, 10)), "need 7 more")
check("it can be encoded", { ...Schema.encodeSync(InsufficientFunds)(new InsufficientFunds({ needed: 7 })) }, {
  _tag: "InsufficientFunds",
  needed: 7
})
