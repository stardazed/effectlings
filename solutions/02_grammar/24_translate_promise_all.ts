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

const pair: Effect.Effect<[number, string]> = Effect.all([loadA, loadB])
const items = (ids: ReadonlyArray<number>): Effect.Effect<Array<string>> => Effect.forEach(ids, load)

check("pair", Effect.runSync(pair), [1, "b"])
check("items", Effect.runSync(items([1, 2])), ["item-1", "item-2"])
