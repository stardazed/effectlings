//#title Bridging an event source
//#kind complete
//#teaches Stream.callback, Queue.offerUnsafe, Queue.endUnsafe
//#hint The function receives a queue. Push values with Queue.offerUnsafe and close it with Queue.endUnsafe.
//#hint Stream.callback<number>((queue) => Effect.sync(() => { source.subscribe((n) => Queue.offerUnsafe(queue, n), () => Queue.endUnsafe(queue)) }))
/**
 * Stream.callback turns push-style sources (event emitters, sockets) into
 * streams. You receive a queue and feed it from your callbacks:
 *
 *   Stream.callback<A>((queue) => Effect.sync(() => { ... Queue.offerUnsafe(queue, a) ... Queue.endUnsafe(queue) }))
 *
 * The "Unsafe" functions are plain synchronous calls, meant for exactly this:
 * use them inside callbacks that are not Effects.
 *
 * Goal: stream every number the ticker emits, ending when it is done.
 */
import { Effect, Queue, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const ticker = (onTick: (n: number) => void, onDone: () => void): void => {
  let n = 0
  const timer = setInterval(() => {
    n += 1
    onTick(n)
    if (n === 3) {
      clearInterval(timer)
      onDone()
    }
  }, 2)
}

//#solution
const ticks: Effect.Effect<Array<number>> = Stream.callback<number>((queue) =>
  Effect.sync(() => {
    ticker((n) => Queue.offerUnsafe(queue, n), () => Queue.endUnsafe(queue))
  })
).pipe(Stream.runCollect)
//#exercise
const ticks: Effect.Effect<Array<number>> = todo()
//#end

check("ticks", await Effect.runPromise(ticks), [1, 2, 3])
