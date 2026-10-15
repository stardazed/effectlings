//#title Effect.log and the default level
//#kind complete
//#teaches Effect.log
//#hint Effect.log with no level is the same as Effect.logInfo.
//#hint The level is Info.
/**
 * Effect.log takes any number of values and joins them with spaces.
 * Predict the level and the text of the line below.
 */
import { Effect } from "effect"
import { recordLogs } from "../../src/observe.ts"

const { logs, layer } = recordLogs()
await Effect.runPromise(Effect.log("user", "ada", "signed in").pipe(Effect.provide(layer)))

//#solution
const expected: { level: string; message: string } = { level: "Info", message: "user ada signed in" }
//#exercise
const expected: { level: string; message: string } = todo()
//#end

check("the line", { level: logs[0].level, message: logs[0].message }, expected)
