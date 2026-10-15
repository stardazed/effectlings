//#title Translate: a parallel limit
//#kind translate
//#deepens Effect.forEach
//#hint p-limit's limit(2) is the concurrency option of forEach.
//#hint Effect.forEach(urls, download, { concurrency: 2 })
/**
 * Plain TypeScript, with the p-limit package:
 *
 *   const limit = pLimit(2)
 *   const results = await Promise.all(urls.map((url) => limit(() => download(url))))
 *
 * In Effect the limit is an option, and no extra package is needed.
 * `download` already returns an Effect. Write downloadAll.
 */
import { Effect } from "effect"

let active = 0
let maxActive = 0
const download = (url: string) =>
  Effect.gen(function*() {
    active += 1
    maxActive = Math.max(maxActive, active)
    yield* Effect.sleep("4 millis")
    active -= 1
    return url.toUpperCase()
  })

//#solution
const downloadAll = (urls: ReadonlyArray<string>): Effect.Effect<Array<string>> =>
  Effect.forEach(urls, download, { concurrency: 2 })
//#exercise
const downloadAll = (urls: ReadonlyArray<string>): Effect.Effect<Array<string>> => todo()
//#end

check("results", await Effect.runPromise(downloadAll(["a", "b", "c", "d", "e"])), ["A", "B", "C", "D", "E"])
check("at most two at once", maxActive, 2)
