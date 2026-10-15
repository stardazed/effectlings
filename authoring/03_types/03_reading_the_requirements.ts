//#title Reading the requirements
//#kind fix
//#teaches Effect.Services
//#later Context.Service
//#hint The generator yields Mailer. That is what the program asks for.
//#hint Change `Needs` to Mailer.
/**
 * The R slot lists what a program needs in order to run. In this course
 * the things a program needs are called services. A service is asked for
 * by yielding it:
 *
 *   const mailer = yield* Mailer
 *
 * You will learn to define services in chapter 06. Here `Mailer` is
 * given to you. Just notice that asking for it changes the program's type:
 *
 *   Effect.Services<typeof program>    the R slot
 *
 * Goal: fix `Needs`.
 */
import { Context, Effect } from "effect"

// Scaffolding, do not edit.
class Mailer extends Context.Service<Mailer, {
  readonly send: (to: string) => Effect.Effect<void>
}>()("Mailer") {}

const program = Effect.gen(function*() {
  const mailer = yield* Mailer
  yield* mailer.send("ada@example.com")
  return "sent"
})

//#solution
type Needs = Mailer
//#exercise
type Needs = never
//#end

export type Test = Expect<Equal<Effect.Services<typeof program>, Needs>>

check("the program is a value", typeof program, "object")
