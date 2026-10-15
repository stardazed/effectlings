/**
 * Effect.map(f) changes the value a program produces, without running it.
 *
 *   program.pipe(Effect.map((value) => newValue))
 *
 * `.pipe(...)` is a method on every Effect. It feeds the effect to the
 * function you give it. Here that function is `Effect.map(f)`.
 * The result is a new program; the original is untouched.
 *
 * Goal: add 50% tax to the price.
 */
// I AM NOT DONE
import { Effect } from "effect"

const price = Effect.succeed(20)

const withTax: Effect.Effect<number> = todo()

check("with tax", Effect.runSync(withTax), 30)
check("the original is unchanged", Effect.runSync(price), 20)
