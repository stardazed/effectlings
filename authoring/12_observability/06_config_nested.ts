//#title Grouping settings under a prefix
//#kind complete
//#teaches Config.nested
//#hint nested takes the Config and the name of the group.
//#hint Config.nested(Config.all({ ... }), "...")
/**
 * Config.nested(config, "db") looks every key of `config` up under a group
 * called "db". With a plain object that is a nested object; with environment
 * variables the group name becomes a prefix: db_url, db_pool.
 *
 * Goal: read url and pool from the "db" group.
 */
import { ConfigProvider, Config, Effect } from "effect"

//#solution
const dbConfig: Config.Config<{ url: string; pool: number }> =
  Config.nested(Config.all({ url: Config.String("url"), pool: Config.Int("pool") }), "db")
//#exercise
const dbConfig: Config.Config<{ url: string; pool: number }> = todo()
//#end

const provider = ConfigProvider.layer(ConfigProvider.fromUnknown({ db: { url: "pg://localhost", pool: "5" } }))
check("db config", await Effect.runPromise(dbConfig.pipe(Effect.provide(provider))), { url: "pg://localhost", pool: 5 })
