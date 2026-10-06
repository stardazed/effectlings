//#title Translate: node-style callbacks
//#kind translate
//#deepens Effect.callback
//#hint The callback receives (error, value). Its error is typed Error | null, so error.message is fine here.
//#hint resume(Effect.fail(error.message)) for the error, resume(Effect.succeed(value)) otherwise.
/**
 * Plain TypeScript, node-style callback: the first argument is an error
 * (or null), the second is the value.
 *
 *   readSetting("theme", (error, value) => { ... })
 *
 * Expose it as an Effect that fails with the error's message, or succeeds
 * with the value. Effect.callback can take type arguments for both:
 * Effect.callback<A, E>.
 */
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const readSetting = (key: string, callback: (error: Error | null, value?: string) => void): void => {
  setTimeout(() => (key === "theme" ? callback(null, "dark") : callback(new Error(`unknown setting: ${key}`))), 1)
}

//#solution
const setting = (key: string): Effect.Effect<string, string> =>
  Effect.callback<string, string>((resume) => {
    readSetting(key, (error, value) => {
      if (error !== null) resume(Effect.fail(error.message))
      else resume(Effect.succeed(value ?? ""))
    })
  })
//#exercise
const setting = (key: string): Effect.Effect<string, string> => todo()
//#end

check("known setting", await Effect.runPromise(setting("theme")), "dark")
check("unknown setting", await rejection(Effect.runPromise(setting("font"))), "unknown setting: font")
