//#title A default for a missing setting
//#kind complete
//#teaches Config.withDefault, Config.Config
//#hint withDefault is applied with pipe, and takes the default value.
//#hint Config.Int("RETRIES").pipe(Config.withDefault(...))
/**
 * A setting that is not provided normally fails. Config.withDefault(value)
 * supplies a fallback for a MISSING key:
 *
 *   Config.Int("RETRIES").pipe(Config.withDefault(3))
 *
 * Note what it does not do: a key that is present but invalid (RETRIES=abc)
 * is still an error. A default is for "not set", not for "set wrongly".
 *
 * The type of a Config is Config.Config<A>: a recipe for reading an A.
 *
 * Goal: retries defaults to 3.
 */
import { ConfigProvider, Config, Effect, Exit } from "effect"

//#solution
const retries: Config.Config<number> = Config.Int("RETRIES").pipe(Config.withDefault(3))
//#exercise
const retries: Config.Config<number> = todo()
//#end

const using = (values: unknown) => retries.pipe(Effect.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(values))))

check("missing uses the default", await Effect.runPromise(using({})), 3)
check("present is used", await Effect.runPromise(using({ RETRIES: "10" })), 10)
check("invalid is still an error", Exit.isFailure(await Effect.runPromiseExit(using({ RETRIES: "abc" }))), true)
