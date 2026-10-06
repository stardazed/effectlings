/**
 * A Promise starts working the moment it is created. An Effect should not.
 * Effect.promise takes a function that creates the promise, and calls it
 * each time the program is run.
 *
 *   Effect.promise(() => somePromise)
 *
 * Use it only when the promise cannot reject. If it might reject, use the
 * next constructor you will meet.
 *
 * Goal: wrap loadGreeting so it only starts when the program runs.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let started = 0
const loadGreeting = (): Promise<string> => {
  started += 1
  return Promise.resolve("hi")
}

const program = todo()

check("building it does not start the promise", started, 0)
check("result", await Effect.runPromise(program), "hi")
check("started exactly once", started, 1)
