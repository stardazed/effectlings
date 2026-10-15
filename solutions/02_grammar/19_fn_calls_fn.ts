/**
 * Functions written with Effect.fn return effects, so you can yield* them
 * inside other generators. Small functions compose into bigger ones.
 *
 * Goal: total = subtotal + shipping, where subtotal comes from `subtotal`.
 */
import { Effect } from "effect"

const subtotal = Effect.fn("subtotal")((unit: number, qty: number) => Effect.succeed(unit * qty))
const shipping = Effect.succeed(5)

const total: (unit: number, qty: number) => Effect.Effect<number> =
  Effect.fn("total")(function*(unit: number, qty: number) {
    const sub = yield* subtotal(unit, qty)
    const ship = yield* shipping
    return sub + ship
  })

check("total", Effect.runSync(total(3, 4)), 17)
