//#title Services with a default
//#kind complete
//#teaches Context.Reference
//#hint Context.Reference takes the value type, an id, and an options object with defaultValue.
//#hint Context.Reference<"quiet" | "loud">("Verbosity", { defaultValue: () => "quiet" as const })
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
import { Context, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const Verbosity = Context.Reference<"quiet" | "loud">("Verbosity", { defaultValue: () => "quiet" as const })
//#exercise
const Verbosity: Context.Reference<"quiet" | "loud"> = todo()
//#end

const current = Effect.gen(function*() {
  return yield* Verbosity
})

check("default", Effect.runSync(current), "quiet")
check("overridden", Effect.runSync(current.pipe(Effect.provideService(Verbosity, "loud"))), "loud")
