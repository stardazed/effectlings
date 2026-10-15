/**
 * Each provideService removes one service from R. Provide one of two and
 * the other stays, visible in the type.
 *
 * Goal: provide Db only, so `halfProvided` still needs Mailer.
 * The last lines finish the job.
 */
import { Context, Effect } from "effect"

// Scaffolding, do not edit.
class Db extends Context.Service<Db, { readonly find: (id: number) => string }>()("Db") {}
class Mailer extends Context.Service<Mailer, {
  readonly send: (to: string) => Effect.Effect<string>
}>()("Mailer") {}

const program = Effect.gen(function*() {
  const db = yield* Db
  const mailer = yield* Mailer
  return yield* mailer.send(db.find(1))
})

const halfProvided: Effect.Effect<string, never, Mailer> =
  program.pipe(Effect.provideService(Db, { find: (id) => `user-${id}@example.com` }))

export type Test = Expect<Equal<Effect.Services<typeof halfProvided>, Mailer>>

const complete = halfProvided.pipe(Effect.provideService(Mailer, { send: (to) => Effect.succeed(`sent to ${to}`) }))
check("result", Effect.runSync(complete), "sent to user-1@example.com")
