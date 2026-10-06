/**
 * Real services can have many methods, and a test may only need one.
 * Layer.mock(Service)(partial) builds a layer from a PARTIAL implementation.
 * Any method you leave out is not silently undefined: calling it is a
 * defect with a clear "unimplemented" message, so a test cannot accidentally
 * depend on something it did not fake.
 *
 * Goal: a Users layer that only implements find.
 */
// I AM NOT DONE
import { Context, Effect, Layer } from "effect"
import { causeKind, check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Users extends Context.Service<Users, {
  readonly find: (id: number) => Effect.Effect<string>
  readonly remove: (id: number) => Effect.Effect<void>
}>()("Users") {}

const usersMock: Layer.Layer<Users> = todo()

const find = Users.use((u) => u.find(7)).pipe(Effect.provide(usersMock))
const remove = Users.use((u) => u.remove(7)).pipe(Effect.provide(usersMock))

check("find works", Effect.runSync(find), "user-7")
check("remove is unimplemented, which is a defect", await causeKind(remove), { fails: false, dies: true })
