/**
 * An Effect is a value that describes a program.
 * Creating one does not run anything.
 *
 *   Effect.succeed(x)      a program that finishes with x
 *   Effect.runSync(prog)   run a program and hand back its result
 *
 * Goal: describe a program that finishes with 42, then run it.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const program = Effect.succeed(42)
const result: number = Effect.runSync(program)

check("a program is not its result", typeof program, "object")
check("running it gives 42", result, 42)
