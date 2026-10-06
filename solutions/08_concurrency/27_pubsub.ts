/**
 * A queue gives each value to ONE consumer. A PubSub gives each value to
 * EVERY subscriber.
 *
 *   PubSub.unbounded<A>()     a hub
 *   PubSub.subscribe(hub)     a subscription (needs a scope; it is removed when the scope closes)
 *   PubSub.publish(hub, a)    send to all current subscribers
 *   PubSub.take(sub)          receive the next message
 *
 * Goal: two subscribers both receive the published message.
 */
import { Effect, PubSub } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const program = Effect.scoped(
  Effect.gen(function*() {
    const hub = yield* PubSub.unbounded<string>()
    const first = yield* PubSub.subscribe(hub)
    const second = yield* PubSub.subscribe(hub)
    yield* PubSub.publish(hub, "hi")
    return [yield* PubSub.take(first), yield* PubSub.take(second)]
  })
)

check("both received it", await Effect.runPromise(program), ["hi", "hi"])
