//#title Wrapping a callback
//#kind complete
//#teaches Effect.callback
//#hint The function you give to Effect.callback receives a resume function.
//#hint Call resume(Effect.succeed(value)) when the callback fires.
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

//#solution
const program: Effect.Effect<string> = Effect.callback<string>((resume) => {
  later(5, (value) => resume(Effect.succeed(value)))
})
//#exercise
const program: Effect.Effect<string> = todo()
//#end

check("result", await Effect.runPromise(program), "done")
