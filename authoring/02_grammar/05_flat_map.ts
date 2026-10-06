//#title Chaining programs with flatMap
//#kind complete
//#teaches Effect.flatMap
//#hint The function you give to flatMap returns an Effect, not a plain value.
//#hint userId.pipe(Effect.flatMap(loadUser), Effect.map((user) => user.name))
/**
 * map takes a function that returns a plain value.
 * flatMap takes a function that returns another Effect, and runs it
 * after the first program has finished.
 *
 *   first.pipe(Effect.flatMap((a) => second(a)))
 *
 * Goal: load the user whose id is produced by `userId`, then produce
 * that user's name.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

interface User {
  readonly id: number
  readonly name: string
}

const userId = Effect.succeed(7)
const loadUser = (id: number): Effect.Effect<User> => Effect.succeed({ id, name: `user-${id}` })

//#solution
const userName: Effect.Effect<string> = userId.pipe(
  Effect.flatMap(loadUser),
  Effect.map((user) => user.name)
)
//#exercise
const userName: Effect.Effect<string> = todo()
//#end

check("user name", Effect.runSync(userName), "user-7")
