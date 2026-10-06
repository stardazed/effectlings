/**
 * A Reference is a service that has a default value. Asking for it never
 * adds to R, because there is always something to give you. You can still
 * override it with provideService.
 *
 *   const Verbosity = Context.Reference<"quiet" | "loud">("Verbosity", {
 *     defaultValue: () => "quiet" as const
 *   })
 *
 * It suits configuration and flags: things with a sensible default.
 *
 * Goal: define Verbosity with the default "quiet".
 */
// I AM NOT DONE
import { Context, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Verbosity: Context.Reference<"quiet" | "loud"> = todo()

const current = Effect.gen(function*() {
  return yield* Verbosity
})

check("default", Effect.runSync(current), "quiet")
check("overridden", Effect.runSync(current.pipe(Effect.provideService(Verbosity, "loud"))), "loud")
