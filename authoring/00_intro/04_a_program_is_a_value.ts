//#title A program is a value
//#kind complete
//#teaches Effect.succeed, Effect.runSync
//#hint Effect.succeed takes the value the program should finish with.
//#hint Effect.runSync(program) runs the program and returns its result.
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

//#solution
const program = Effect.succeed(42)
const result: number = Effect.runSync(program)
//#exercise
const program = todo() // describe a program that finishes with 42
const result: number = todo() // run it
//#end

check("a program is not its result", typeof program, "object")
check("running it gives 42", result, 42)
