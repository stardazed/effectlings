//#title Wrapping a Promise that can reject
//#kind complete
//#teaches Effect.tryPromise
//#hint Effect.tryPromise takes an object with two functions: try and catch.
//#hint The catch parameter is typed unknown, so error.message does not compile yet. Narrow it first with instanceof Error.
//#hint catch: (error) => (error instanceof Error ? error.message : String(error))
/**
 * Effect.tryPromise turns a rejection into a typed failure.
 *
 *   Effect.tryPromise({
 *     try: () => somePromise,        // may reject
 *     catch: (error) => yourError    // becomes the E of the effect
 *   })
 *
 * One thing to know about `catch`: its parameter is typed `unknown`.
 * JavaScript lets you throw or reject with anything (a string, a number,
 * an Error), so TypeScript cannot promise a shape. To read `.message` you
 * must check what you received first:
 *
 *   (error) => (error instanceof Error ? error.message : String(error))
 *
 * You will see this small pattern again in later exercises.
 * The errors chapter shows a nicer habit: keep the raw value as a `cause`.
 *
 * Goal: wrap `f` so that a rejection becomes a failure carrying the
 * error's message as a string.
 */
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const flaky = (): Promise<number> => Promise.reject(new Error("network down"))
const steady = (): Promise<number> => Promise.resolve(7)

//#solution
const wrap = (f: () => Promise<number>): Effect.Effect<number, string> =>
  Effect.tryPromise({
    try: () => f(),
    catch: (error) => (error instanceof Error ? error.message : String(error))
  })
//#exercise
const wrap = (f: () => Promise<number>): Effect.Effect<number, string> => todo()
//#end

check("steady succeeds", await Effect.runPromise(wrap(steady)), 7)
check("flaky fails with its message", await rejection(Effect.runPromise(wrap(flaky))), "network down")
