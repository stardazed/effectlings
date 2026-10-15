/**
 * Plain TypeScript, with the p-limit package:
 *
 *   const limit = pLimit(2)
 *   const results = await Promise.all(urls.map((url) => limit(() => download(url))))
 *
 * In Effect the limit is an option, and no extra package is needed.
 * `download` already returns an Effect. Write downloadAll.
 */
// I AM NOT DONE
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

const downloadAll = (urls: ReadonlyArray<string>): Effect.Effect<Array<string>> => todo()

check("results", await Effect.runPromise(downloadAll(["a", "b", "c", "d", "e"])), ["A", "B", "C", "D", "E"])
check("at most two at once", maxActive, 2)
