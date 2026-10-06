/**
 * Write `notify(id)`:
 *  - looks up the user's email with Db
 *  - fails with "no such user" when there is none
 *  - otherwise sends "hello" with Mailer and finishes with "notified"
 *
 * The type is fixed for you. Then the last lines provide both services
 * and run it.
 */
import { Context, Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"
import type { Equal, Expect } from "../../src/types.ts"

// Scaffolding, do not edit.
class Db extends Context.Service<Db, {
  readonly emailOf: (id: number) => string | undefined
}>()("Db") {}
class Mailer extends Context.Service<Mailer, {
  readonly send: (to: string, text: string) => Effect.Effect<void>
}>()("Mailer") {}

const notify = Effect.fn("notify")(function*(id: number): Effect.fn.Return<"notified", "no such user", Db | Mailer> {
  const db = yield* Db
  const mailer = yield* Mailer
  const email = db.emailOf(id)
  if (email === undefined) return yield* Effect.fail("no such user" as const)
  yield* mailer.send(email, "hello")
  return "notified"
})

export type Test = Expect<Equal<Effect.Services<ReturnType<typeof notify>>, Db | Mailer>>

const outbox: Array<string> = []
const live = <A, E>(program: Effect.Effect<A, E, Db | Mailer>) =>
  program.pipe(
    Effect.provideService(Db, { emailOf: (id) => (id === 1 ? "ada@example.com" : undefined) }),
    Effect.provideService(Mailer, { send: (to, text) => Effect.sync(() => { outbox.push(`${to}: ${text}`) }) })
  )

check("known user", await Effect.runPromise(live(notify(1))), "notified")
check("outbox", outbox, ["ada@example.com: hello"])
check("unknown user", await rejection(Effect.runPromise(live(notify(2)))), "no such user")
