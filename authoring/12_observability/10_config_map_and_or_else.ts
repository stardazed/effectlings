//#title Adjusting and falling back
//#kind complete
//#teaches Config.map, Config.orElse
//#hint map transforms the value, orElse tries another Config when the first fails.
//#hint Config.Int("TIMEOUT_SECONDS").pipe(Config.map((s) => s * 1000)) and Config.String("NEW_NAME").pipe(Config.orElse(() => Config.String("OLD_NAME")))
/**
 *   Config.map(f)           transform the value that was read
 *   Config.orElse(() => c)  if this Config fails, try c instead
 *
 * Goal: read a timeout in seconds as milliseconds, and read a name from
 * NEW_NAME or else from the older OLD_NAME.
 */
import { ConfigProvider, Config, Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const timeoutMillis: Config.Config<number> = Config.Int("TIMEOUT_SECONDS").pipe(Config.map((s) => s * 1000))
const name: Config.Config<string> = Config.String("NEW_NAME").pipe(Config.orElse(() => Config.String("OLD_NAME")))
//#exercise
const timeoutMillis: Config.Config<number> = todo()
const name: Config.Config<string> = todo()
//#end

const using = <A>(config: Config.Config<A>, values: unknown) =>
  Effect.runPromise(config.pipe(Effect.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(values)))))

check("timeout", await using(timeoutMillis, { TIMEOUT_SECONDS: "5" }), 5000)
check("new name", await using(name, { NEW_NAME: "new", OLD_NAME: "old" }), "new")
check("old name as a fallback", await using(name, { OLD_NAME: "old" }), "old")
