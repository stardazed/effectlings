/**
 * A function's signature tells the whole story:
 *
 *   (id: string) => Effect<User, "not found", Users>
 *   succeeds with a User, can fail with "not found", needs the Users service
 *
 * Goal: the body is right but the annotation is wrong. Fix the return type.
 */
import { Context, Effect } from "effect"
import { check, rejection } from "../../src/check.ts"

interface User {
  readonly id: string
  readonly name: string
}

// Scaffolding, do not edit.
class Users extends Context.Service<Users, {
  readonly find: (id: string) => User | undefined
}>()("Users") {}

const findUser = (id: string): Effect.Effect<User, "not found", Users> =>
  Effect.gen(function*() {
    const users = yield* Users
    const user = users.find(id)
    if (user === undefined) return yield* Effect.fail("not found" as const)
    return user
  })

const withUsers = Effect.provideService(Users, {
  find: (id) => (id === "1" ? { id, name: "Ada" } : undefined)
})

check("found", await Effect.runPromise(findUser("1").pipe(withUsers)), { id: "1", name: "Ada" })
check("missing", await rejection(Effect.runPromise(findUser("2").pipe(withUsers))), "not found")
