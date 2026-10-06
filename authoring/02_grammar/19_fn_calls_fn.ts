//#title Building on smaller functions
//#kind complete
//#deepens Effect.fn, yield*
//#hint Call the smaller function and yield* its result, like any other effect.
//#hint const sub = yield* subtotal(unit, qty); return sub + shipping
/**
 * Functions written with Effect.fn return effects, so you can yield* them
 * inside other generators. Small functions compose into bigger ones.
 *
 * Goal: total = subtotal + shipping, where subtotal comes from `subtotal`.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const subtotal = Effect.fn("subtotal")(function*(unit: number, qty: number) {
  return yield* Effect.succeed(unit * qty)
})
const shipping = Effect.succeed(5)

//#solution
const total = Effect.fn("total")(function*(unit: number, qty: number) {
  const sub = yield* subtotal(unit, qty)
  const ship = yield* shipping
  return sub + ship
})
//#exercise
const total: (unit: number, qty: number) => Effect.Effect<number> = todo()
//#end

check("total", Effect.runSync(total(3, 4)), 17)
