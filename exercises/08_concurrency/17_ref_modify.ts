/**
 * Ref.modify(ref, f) reads, computes and writes in a single atomic step.
 * f returns a pair:
 *
 *   [valueToReturn, newState]
 *
 * That is exactly what you need for a ticket counter: hand out the current
 * number and move the counter on, with no chance of two callers getting the
 * same ticket.
 *
 * Goal: write nextTicket.
 */
// I AM NOT DONE
import { Effect, Ref } from "effect"

const nextTicket = (ref: Ref.Ref<number>): Effect.Effect<number> => todo()

const program = Effect.gen(function*() {
  const ref = yield* Ref.make(1)
  const first = yield* nextTicket(ref)
  const second = yield* nextTicket(ref)
  const third = yield* nextTicket(ref)
  return { tickets: [first, second, third], next: yield* Ref.get(ref) }
})

check("tickets", await Effect.runPromise(program), { tickets: [1, 2, 3], next: 4 })
