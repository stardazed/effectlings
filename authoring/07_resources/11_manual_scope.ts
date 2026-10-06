//#title Closing a scope yourself
//#kind fix
//#teaches Scope.make, Scope.close, Exit.void
//#hint The scope is made and used, but nothing ever closes it.
//#hint await Effect.runPromise(Scope.close(scope, Exit.void))
/**
 * Effect.scoped opens and closes a scope for you. You can also manage one by hand:
 *
 *   Scope.make()                     an Effect that creates a scope
 *   Effect.provideService(Scope.Scope, scope)   run resource-acquiring code in it
 *   Scope.close(scope, Exit.void)    an Effect that closes it, running the finalizers
 *
 * That is useful when a resource must outlive a single function call. The
 * price: if you forget to close the scope, you leak the resource.
 *
 * Goal: this code leaks its connection. Close the scope.
 */
import { Effect, Exit, Scope } from "effect"
import { check } from "../../src/check.ts"

const log: Array<string> = []
const connection = Effect.acquireRelease(
  Effect.sync(() => {
    log.push("open")
    return { id: 1 }
  }),
  () => Effect.sync(() => { log.push("close") })
)

const scope = await Effect.runPromise(Scope.make())
const conn = await Effect.runPromise(connection.pipe(Effect.provideService(Scope.Scope, scope)))
const whileOpen = [...log]

//#solution
await Effect.runPromise(Scope.close(scope, Exit.void))
//#exercise
// (nothing closes the scope yet)
//#end

check("connection", conn.id, 1)
check("open while the scope is open", whileOpen, ["open"])
check("closed at the end", log, ["open", "close"])
