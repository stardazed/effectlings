/**
 * Effect.gen lets you write a sequence of effects like async/await:
 *
 *   Effect.gen(function*() {
 *     const a = yield* effectA      // run effectA, name its result a
 *     const b = yield* effectB(a)
 *     return a + b                  // the value the whole program produces
 *   })
 *
 * `yield*` plays the role of `await`. It is the same as a chain of
 * flatMap calls, just easier to read. This is the style you will use most.
 *
 * Goal: redo the previous exercise with Effect.gen.
 */
import { Effect } from "effect"

interface User {
  readonly id: number
  readonly name: string
}

const userId = Effect.succeed(7)
const loadUser = (id: number): Effect.Effect<User> => Effect.succeed({ id, name: `user-${id}` })

const userName: Effect.Effect<string> = Effect.gen(function*() {
  const id = yield* userId
  const user = yield* loadUser(id)
  return user.name
})

check("user name", Effect.runSync(userName), "user-7")
