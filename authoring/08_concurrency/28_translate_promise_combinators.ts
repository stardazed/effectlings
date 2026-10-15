//#title Translate: Promise.all and Promise.race
//#kind translate
//#deepens Effect.all, Effect.race
//#hint Promise.all becomes Effect.all with concurrency "unbounded". Promise.race becomes Effect.race.
//#hint Effect.all([loadUser, loadPosts], { concurrency: "unbounded" }) and Effect.race(mirrorA, mirrorB)
/**
 * Plain TypeScript:
 *
 *   const [user, posts] = await Promise.all([loadUser(), loadPosts()])
 *   const fastest = await Promise.race([mirrorA(), mirrorB()])
 *
 * Promise.all runs everything at once, which for Effect.all means asking
 * for concurrency. Promise.race keeps the first settled result, but leaves
 * the loser running; Effect.race interrupts it.
 *
 * The loaders already return Effects. Write both.
 */
import { Effect } from "effect"

const log: Array<string> = []
const loader = (name: string, ms: number) =>
  Effect.gen(function*() {
    log.push(`start ${name}`)
    yield* Effect.sleep(`${ms} millis`)
    log.push(`end ${name}`)
    return name
  })

//#solution
const both: Effect.Effect<[string, string]> = Effect.all([loader("user", 8), loader("posts", 2)], { concurrency: "unbounded" })
const fastest: Effect.Effect<string> = Effect.race(loader("mirrorA", 30), loader("mirrorB", 2))
//#exercise
const both: Effect.Effect<[string, string]> = todo()
const fastest: Effect.Effect<string> = todo()
//#end

check("both results, in order", await Effect.runPromise(both), ["user", "posts"])
check("they ran at the same time", log.slice(0, 4), ["start user", "start posts", "end posts", "end user"])
log.length = 0
check("the fastest mirror", await Effect.runPromise(fastest), "mirrorB")
check("the slow mirror never finished", log.includes("end mirrorA"), false)
