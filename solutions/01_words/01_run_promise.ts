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
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const program = Effect.succeed("hello")

const result: string = await Effect.runPromise(program)

check("result", result, "hello")
