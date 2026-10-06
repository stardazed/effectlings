//#title Translate: AbortController
//#kind translate
//#deepens Effect.tryPromise, Fiber.interrupt, Effect.forkChild, Effect.yieldNow
//#hint tryPromise passes an AbortSignal to your try function. Interrupting the fiber aborts that signal.
//#hint Effect.tryPromise({ try: (signal) => slowFetch(signal), catch: () => "failed" })
/**
 * Plain TypeScript:
 *
 *   const controller = new AbortController()
 *   const request = slowFetch(controller.signal)
 *   controller.abort()                    // somebody cancels
 *
 * You have to create and pass the controller by hand. Effect does it for
 * you: the function given to Effect.tryPromise's `try` receives an
 * AbortSignal, and interrupting the fiber aborts it.
 *
 *   Effect.tryPromise({ try: (signal) => ..., catch: ... })
 *
 * slowFetch is given. Write `request`.
 */
import { Effect, Fiber } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let aborted = false
const slowFetch = (signal: AbortSignal): Promise<string> =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve("data"), 200)
    signal.addEventListener("abort", () => {
      aborted = true
      clearTimeout(timer)
      reject(new Error("aborted"))
    })
  })

//#solution
const request: Effect.Effect<string, string> = Effect.tryPromise({
  try: (signal) => slowFetch(signal),
  catch: () => "failed"
})
//#exercise
const request: Effect.Effect<string, string> = todo()
//#end

await Effect.runPromise(
  Effect.gen(function*() {
    const fiber = yield* Effect.forkChild(request)
    yield* Effect.yieldNow
    yield* Fiber.interrupt(fiber)
  })
)
check("interrupting the fiber aborted the request", aborted, true)
