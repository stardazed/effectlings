/**
 * An Effect is a value that describes a program.
 * Creating one does not run anything.
 *
 *   Effect.succeed(x)      a program that finishes with x
 *   Effect.runSync(prog)   run a program and hand back its result
 *
 * Goal: describe a program that finishes with 42, then run it.
 */
// I AM NOT DONE
import { Effect } from "effect"

const program = todo() // describe a program that finishes with 42
const result: number = todo() // run it

check("a program is not its result", typeof program, "object")
check("running it gives 42", result, 42)
