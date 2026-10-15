/**
 *   Config.map(f)           transform the value that was read
 *   Config.orElse(() => c)  if this Config fails, try c instead
 *
 * Goal: read a timeout in seconds as milliseconds, and read a name from
 * NEW_NAME or else from the older OLD_NAME.
 */
// I AM NOT DONE
import { ConfigProvider, Config, Effect } from "effect"

const timeoutMillis: Config.Config<number> = todo()
const name: Config.Config<string> = todo()

const using = <A>(config: Config.Config<A>, values: unknown) =>
  Effect.runPromise(config.pipe(Effect.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(values)))))

check("timeout", await using(timeoutMillis, { TIMEOUT_SECONDS: "5" }), 5000)
check("new name", await using(name, { NEW_NAME: "new", OLD_NAME: "old" }), "new")
check("old name as a fallback", await using(name, { OLD_NAME: "old" }), "old")
