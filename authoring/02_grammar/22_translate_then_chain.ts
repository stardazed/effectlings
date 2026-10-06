//#title Translate: a .then chain
//#kind translate
//#deepens Effect.flatMap, Effect.map, .pipe
//#hint .then with a function returning a Promise is flatMap. With a plain value it is map.
//#hint fetchUser(id).pipe(Effect.flatMap((u) => fetchPosts(u.id)), Effect.map((posts) => posts.length))
/**
 * Plain TypeScript:
 *
 *   fetchUser(id)
 *     .then((user) => fetchPosts(user.id))
 *     .then((posts) => posts.length)
 *
 * The two fetch functions already return Effects. Write the same pipeline.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const fetchUser = (id: number): Effect.Effect<{ readonly id: number }> => Effect.succeed({ id })
const fetchPosts = (userId: number): Effect.Effect<ReadonlyArray<string>> =>
  Effect.succeed(userId === 1 ? ["x", "y"] : [])

//#solution
const postCount = (id: number): Effect.Effect<number> =>
  fetchUser(id).pipe(
    Effect.flatMap((user) => fetchPosts(user.id)),
    Effect.map((posts) => posts.length)
  )
//#exercise
const postCount = (id: number): Effect.Effect<number> => todo()
//#end

check("user 1", Effect.runSync(postCount(1)), 2)
check("user 2", Effect.runSync(postCount(2)), 0)
