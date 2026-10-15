/**
 * Effect.forEach(items, f) runs f on every item, in order, and collects
 * the results into an array. f returns an Effect.
 *
 * Goal: load the name of every id.
 */
// I AM NOT DONE
import { Effect } from "effect"

const loadName = (id: number): Effect.Effect<string> => Effect.succeed(`user-${id}`)

const names = (ids: ReadonlyArray<number>): Effect.Effect<Array<string>> => todo()

check("names", Effect.runSync(names([1, 2, 3])), ["user-1", "user-2", "user-3"])
check("no ids", Effect.runSync(names([])), [])
