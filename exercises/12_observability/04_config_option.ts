/**
 * Sometimes there is no sensible default and absence means "do not use this
 * feature". Config.option(config) turns a missing key into none instead of
 * an error.
 *
 * Goal: an optional proxy URL.
 */
// I AM NOT DONE
import { ConfigProvider, Config, Effect, Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const proxy: Config.Config<Option.Option<string>> = todo()

const using = (values: unknown) => proxy.pipe(Effect.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(values))))

check("not set", await Effect.runPromise(using({})), Option.none())
check("set", await Effect.runPromise(using({ PROXY: "http://proxy" })), Option.some("http://proxy"))
