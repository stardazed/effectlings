/**
 * Plain TypeScript:
 *
 *   async function withBoth<A>(work: (db: Db, cache: Cache) => Promise<A>): Promise<A> {
 *     const db = await connectDb()
 *     try {
 *       const cache = await connectCache()
 *       try {
 *         return await work(db, cache)
 *       } finally {
 *         await cache.close()
 *       }
 *     } finally {
 *       await db.close()
 *     }
 *   }
 *
 * Each level of nesting exists only to get the release order right. With a
 * scope the nesting disappears, and the order is still reverse.
 *
 * The connections are given. Write withBoth.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const log: Array<string> = []
const acquireDb = Effect.acquireRelease(
  Effect.sync(() => { log.push("open db"); return "db" }),
  () => Effect.sync(() => { log.push("close db") })
)
const acquireCache = Effect.acquireRelease(
  Effect.sync(() => { log.push("open cache"); return "cache" }),
  () => Effect.sync(() => { log.push("close cache") })
)

const withBoth = <A>(work: (db: string, cache: string) => Effect.Effect<A>): Effect.Effect<A> =>
  Effect.scoped(
    Effect.gen(function*() {
      const db = yield* acquireDb
      const cache = yield* acquireCache
      return yield* work(db, cache)
    })
  )

const result = await Effect.runPromise(
  withBoth((db, cache) => Effect.sync(() => { log.push("work"); return `${db}+${cache}` }))
)
check("result", result, "db+cache")
check("log", log, ["open db", "open cache", "work", "close cache", "close db"])
