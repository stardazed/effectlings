/**
 * Seven small jobs, one constructor each. The comments say what each
 * legacy piece does; choose the right way to wrap it.
 */
import { Effect } from "effect"

let ticks = 0
const tick = (): number => ++ticks // plain function, never throws
const parseAge = (s: string): number => { // throws on bad input
  const n = Number(s)
  if (!Number.isInteger(n)) throw new Error("bad age")
  return n
}
const loadName = (): Promise<string> => Promise.resolve("Ada") // never rejects
const loadPrice = (ok: boolean): Promise<number> => (ok ? Promise.resolve(10) : Promise.reject(new Error("no price"))) // can reject
// The narrowing pattern from the tryPromise exercise, as a helper.
const message = (e: unknown): string => (e instanceof Error ? e.message : String(e))

const pi: Effect.Effect<number> = Effect.succeed(3.14)
const counted: Effect.Effect<number> = Effect.sync(() => tick())
const age = (s: string): Effect.Effect<number, string> => Effect.try({ try: () => parseAge(s), catch: message })
const name: Effect.Effect<string> = Effect.promise(() => loadName())
const price = (ok: boolean): Effect.Effect<number, string> =>
  Effect.tryPromise({ try: () => loadPrice(ok), catch: message })
const nothing: Effect.Effect<void> = Effect.void
const refuse: Effect.Effect<never, string> = Effect.fail("refused")

check("pi", Effect.runSync(pi), 3.14)
check("counted 1", Effect.runSync(counted), 1)
check("counted 2", Effect.runSync(counted), 2)
check("age ok", Effect.runSync(age("41")), 41)
check("age bad", await rejection(Effect.runPromise(age("x"))), "bad age")
check("name", await Effect.runPromise(name), "Ada")
check("price ok", await Effect.runPromise(price(true)), 10)
check("price bad", await rejection(Effect.runPromise(price(false))), "no price")
check("nothing", Effect.runSync(nothing), undefined)
check("refuse", await rejection(Effect.runPromise(refuse)), "refused")
