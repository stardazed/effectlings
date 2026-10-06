//#title map or flatMap?
//#kind fix
//#deepens Effect.map, Effect.flatMap
//#hint Read the type error. Effect<Effect<User>> means an Effect is wrapped inside another.
//#hint map wraps the function's result. When that result is already an Effect, use flatMap.
/**
 * If you map with a function that returns an Effect, you get an Effect
 * of an Effect: Effect<Effect<User>>. Nothing inside ever runs.
 *
 * Goal: fix `user` so it has the type Effect<User>.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"

interface User {
  readonly id: number
  readonly name: string
}

const userId = Effect.succeed(7)
const loadUser = (id: number): Effect.Effect<User> => Effect.succeed({ id, name: `user-${id}` })

//#solution
const user: Effect.Effect<User> = userId.pipe(Effect.flatMap(loadUser))
//#exercise
const user: Effect.Effect<User> = userId.pipe(Effect.map(loadUser))
//#end

check("user", Effect.runSync(user), { id: 7, name: "user-7" })
