//#title runSync cannot wait
//#kind fix
//#deepens Effect.runSync, Effect.runPromise, Effect.sleep
//#hint Read the error. The program has to wait, so it cannot finish synchronously.
//#hint Use Effect.runPromise and await it.
/**
 * Effect.runSync only works for programs that can finish without waiting.
 * Anything that sleeps, or waits on a promise or a callback, needs
 * runPromise. The compiler will not stop you; the error happens at runtime.
 *
 * Goal: fix how `slow` is run.
 */
import { Effect } from "effect"

const slow = Effect.sleep("10 millis").pipe(Effect.as("waited"))

//#solution
const result = await Effect.runPromise(slow)
//#exercise
const result = Effect.runSync(slow)
//#end

check("result", result, "waited")
