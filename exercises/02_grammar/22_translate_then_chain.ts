/**
 * Plain TypeScript:
 *
 *   fetchUser(id)
 *     .then((user) => fetchPosts(user.id))
 *     .then((posts) => posts.length)
 *
 * The two fetch functions already return Effects. Write the same pipeline.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const fetchUser = (id: number): Effect.Effect<{ readonly id: number }> => Effect.succeed({ id })
const fetchPosts = (userId: number): Effect.Effect<ReadonlyArray<string>> =>
  Effect.succeed(userId === 1 ? ["x", "y"] : [])

const postCount = (id: number): Effect.Effect<number> => todo()

check("user 1", Effect.runSync(postCount(1)), 2)
check("user 2", Effect.runSync(postCount(2)), 0)
