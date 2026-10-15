/**
 * If you map with a function that returns an Effect, you get an Effect
 * of an Effect: Effect<Effect<User>>. Nothing inside ever runs.
 *
 * Goal: fix `user` so it has the type Effect<User>.
 */
// I AM NOT DONE
import { Effect } from "effect"

interface User {
  readonly id: number
  readonly name: string
}

const userId = Effect.succeed(7)
const loadUser = (id: number): Effect.Effect<User> => Effect.succeed({ id, name: `user-${id}` })

const user: Effect.Effect<User> = userId.pipe(Effect.map(loadUser))

check("user", Effect.runSync(user), { id: 7, name: "user-7" })
