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
// I AM NOT DONE
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

const ticks: Effect.Effect<Array<number>> = todo()

check("ticks", await Effect.runPromise(ticks), [1, 2, 3])
