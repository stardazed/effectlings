/**
 * Functions written with Effect.fn return effects, so you can yield* them
 * inside other generators. Small functions compose into bigger ones.
 *
 * Goal: total = subtotal + shipping, where subtotal comes from `subtotal`.
 */
// I AM NOT DONE
import { Effect } from "effect"

const subtotal = Effect.fn("subtotal")((unit: number, qty: number) => Effect.succeed(unit * qty))
const shipping = Effect.succeed(5)

const total: (unit: number, qty: number) => Effect.Effect<number> = todo()

check("total", Effect.runSync(total(3, 4)), 17)
