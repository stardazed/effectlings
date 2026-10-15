//#title Translate: Promise.all
//#kind translate
//#deepens Effect.all, Effect.forEach
//#hint The fixed list becomes Effect.all. The list built by map becomes Effect.forEach.
//#hint Effect.all([loadA, loadB]) and Effect.forEach(ids, load)
/**
 * Plain TypeScript:
 *
 *   const [a, b] = await Promise.all([loadA(), loadB()])
 *   const names = await Promise.all(ids.map((id) => load(id)))
 *
 * Effect.all and Effect.forEach run their programs one after another by
 * default. Running them at the same time is a topic for the concurrency chapter.
 *
 * Write both.
 */
import { Effect } from "effect"

const loadA = Effect.succeed(1)
const loadB = Effect.succeed("b")
const load = (id: number): Effect.Effect<string> => Effect.succeed(`item-${id}`)

//#solution
const pair: Effect.Effect<[number, string]> = Effect.all([loadA, loadB])
const items = (ids: ReadonlyArray<number>): Effect.Effect<Array<string>> => Effect.forEach(ids, load)
//#exercise
const pair: Effect.Effect<[number, string]> = todo()
const items = (ids: ReadonlyArray<number>): Effect.Effect<Array<string>> => todo()
//#end

check("pair", Effect.runSync(pair), [1, "b"])
check("items", Effect.runSync(items([1, 2])), ["item-1", "item-2"])
