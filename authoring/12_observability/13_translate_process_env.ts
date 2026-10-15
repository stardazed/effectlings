//#title Translate: process.env
//#kind translate
//#deepens Config.String, Config.Int, Config.withDefault, Config.all
//#hint Each line of the plain version becomes one Config. Combine them with Config.all.
//#hint Config.all({ name: ..., workers: ... })
/**
 * Plain TypeScript:
 *
 *   const name = process.env.APP_NAME
 *   if (name === undefined) throw new Error("APP_NAME is required")
 *   const workers = Number(process.env.WORKERS ?? "4")     // NaN if it is not a number
 *
 * The plain version checks one setting by hand, forgets to check the other,
 * and reads the real environment directly so it cannot be tested.
 * Write the Config version.
 */
import { ConfigProvider, Config, Effect } from "effect"

//#solution
const appConfig: Config.Config<{ name: string; workers: number }> = Config.all({
  name: Config.String("APP_NAME"),
  workers: Config.Int("WORKERS").pipe(Config.withDefault(4))
})
//#exercise
const appConfig: Config.Config<{ name: string; workers: number }> = todo()
//#end

const using = (values: unknown) =>
  Effect.runPromiseExit(appConfig.pipe(Effect.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(values)))))

const ok = await using({ APP_NAME: "demo" })
check("defaults apply", ok._tag === "Success" ? ok.value : undefined, { name: "demo", workers: 4 })
const missing = await using({})
check("a missing required setting is an error", missing._tag, "Failure")
const notANumber = await using({ APP_NAME: "demo", WORKERS: "many" })
check("a bad number is an error, not NaN", notANumber._tag, "Failure")
