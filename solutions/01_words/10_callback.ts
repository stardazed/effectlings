/**
 * Some APIs deliver their result to a callback. Effect.callback lets you
 * bridge them:
 *
 *   Effect.callback<A>((resume) => {
 *     startSomething((value) => resume(Effect.succeed(value)))
 *   })
 *
 * The program finishes when you call resume with an effect.
 *
 * Goal: wrap `later` so the program finishes with the value it delivers.
 */
import { Effect } from "effect"

const later = (ms: number, callback: (value: string) => void): void => {
  setTimeout(() => callback("done"), ms)
}

const program: Effect.Effect<string> = Effect.callback<string>((resume) => {
  later(5, (value) => resume(Effect.succeed(value)))
})

check("result", await Effect.runPromise(program), "done")
