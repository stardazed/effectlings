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
// I AM NOT DONE
import { Effect } from "effect"

interface User {
  readonly id: number
  readonly name: string
}

const userId = Effect.succeed(7)
const loadUser = (id: number): Effect.Effect<User> => Effect.succeed({ id, name: `user-${id}` })

const userName: Effect.Effect<string> = todo()

check("user name", Effect.runSync(userName), "user-7")
