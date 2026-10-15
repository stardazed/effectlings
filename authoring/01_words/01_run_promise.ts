//#title Running with a Promise
//#kind complete
//#teaches Effect.runPromise
//#hint runPromise returns a Promise, so await it.
//#hint await Effect.runPromise(...)
/**
 * Effect.runSync runs a program right now, but only when the program can
 * finish without waiting. Most real programs wait (timers, files, network),
 * so the usual runner is:
 *
 *   Effect.runPromise(prog)   run a program, get a Promise of its result
 *
 * Goal: run `program` and keep its result.
 */
import { Effect } from "effect"

const program = Effect.succeed("hello")

//#solution
const result: string = await Effect.runPromise(program)
//#exercise
const result: string = todo() // run `program` with runPromise and await it
//#end

check("result", result, "hello")
