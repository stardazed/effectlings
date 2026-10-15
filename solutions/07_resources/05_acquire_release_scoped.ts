/**
 * acquireUseRelease ties the resource to one function. When several steps
 * must share a resource, use a scope:
 *
 *   Effect.acquireRelease(acquire, release)   get a resource; its release is REGISTERED on the scope
 *   Effect.scoped(program)                    open a scope around program and close it when done
 *
 * Yielding the acquireRelease inside a scoped block gives you the resource.
 * When the block ends, however it ends, the release runs. Its type mentions
 * Scope.Scope in R, which the next exercise explains.
 *
 * Goal: define `connection`, and run the code that uses it inside Effect.scoped.
 */
import { Effect, Scope } from "effect"

const log: Array<string> = []
const open = Effect.sync(() => {
  log.push("open")
  return { id: 7 }
})
const close = Effect.sync(() => { log.push("close") })

const connection: Effect.Effect<{ readonly id: number }, never, Scope.Scope> = Effect.acquireRelease(open, () => close)

const program = Effect.scoped(
  Effect.gen(function*() {
    const conn = yield* connection
    log.push(`use ${conn.id}`)
    return conn.id
  })
)

check("result", await Effect.runPromise(program), 7)
check("log", log, ["open", "use 7", "close"])
