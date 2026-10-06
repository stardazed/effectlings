/**
 * Effect.runSync only works for programs that can finish without waiting.
 * Anything that sleeps, or waits on a promise or a callback, needs
 * runPromise. The compiler will not stop you; the error happens at runtime.
 *
 * Goal: fix how `slow` is run.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"

const slow = Effect.sleep("10 millis").pipe(Effect.as("waited"))

const result = await Effect.runPromise(slow)

check("result", result, "waited")
