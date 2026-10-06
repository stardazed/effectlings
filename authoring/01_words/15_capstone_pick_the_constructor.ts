//#title Capstone: pick the constructor
//#kind translate
//#deepens Effect.succeed, Effect.sync, Effect.fail, Effect.promise, Effect.tryPromise, Effect.try, Effect.void
//#hint For each one ask: is it a plain value, does it run code, can that code throw, is it a promise, can it reject?
//#hint Constructors in play: succeed, fail, void, sync, try, promise, tryPromise.
/**
 * Seven small jobs, one constructor each. The comments say what each
 * legacy piece does; choose the right way to wrap it.
 */
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

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

//#solution
const pi: Effect.Effect<number> = Effect.succeed(3.14)
const counted: Effect.Effect<number> = Effect.sync(() => tick())
const age = (s: string): Effect.Effect<number, string> => Effect.try({ try: () => parseAge(s), catch: message })
const name: Effect.Effect<string> = Effect.promise(() => loadName())
const price = (ok: boolean): Effect.Effect<number, string> =>
  Effect.tryPromise({ try: () => loadPrice(ok), catch: message })
const nothing: Effect.Effect<void> = Effect.void
const refuse: Effect.Effect<never, string> = Effect.fail("refused")
//#exercise
const pi: Effect.Effect<number> = todo() // the constant 3.14
const counted: Effect.Effect<number> = todo() // calls tick each time it runs
const age = (s: string): Effect.Effect<number, string> => todo() // wraps parseAge
const name: Effect.Effect<string> = todo() // wraps loadName
const price = (ok: boolean): Effect.Effect<number, string> => todo() // wraps loadPrice
const nothing: Effect.Effect<void> = todo() // does nothing
const refuse: Effect.Effect<never, string> = todo() // fails with "refused"
//#end

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
