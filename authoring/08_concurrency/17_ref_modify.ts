//#title Reading and changing in one step
//#kind complete
//#teaches Ref.modify
//#hint modify's function returns a pair: [the value to hand back, the new state].
//#hint Ref.modify(ref, (n) => [n, n + 1])
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
import { Effect, Ref } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const nextTicket = (ref: Ref.Ref<number>): Effect.Effect<number> => Ref.modify(ref, (n) => [n, n + 1])
//#exercise
const nextTicket = (ref: Ref.Ref<number>): Effect.Effect<number> => todo()
//#end

const program = Effect.gen(function*() {
  const ref = yield* Ref.make(1)
  const first = yield* nextTicket(ref)
  const second = yield* nextTicket(ref)
  const third = yield* nextTicket(ref)
  return { tickets: [first, second, third], next: yield* Ref.get(ref) }
})

check("tickets", await Effect.runPromise(program), { tickets: [1, 2, 3], next: 4 })
