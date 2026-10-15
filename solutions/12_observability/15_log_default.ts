/**
 * Effect.log takes any number of values and joins them with spaces.
 * Predict the level and the text of the line below.
 */
import { Effect } from "effect"
import { recordLogs } from "../../src/observe.ts"

const { logs, layer } = recordLogs()
await Effect.runPromise(Effect.log("user", "ada", "signed in").pipe(Effect.provide(layer)))

const expected: { level: string; message: string } = { level: "Info", message: "user ada signed in" }

check("the line", { level: logs[0].level, message: logs[0].message }, expected)
