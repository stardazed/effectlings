/**
 *   Rec.fromEntries(pairs)        build a record from [key, value] pairs
 *   Rec.filter(record, pred)      keep the entries whose value passes
 *   Rec.keys(record)              the keys as an array
 *
 * Goal: build a price record, keep the expensive ones, list their names.
 */
// I AM NOT DONE
import { Record as Rec } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const pairs: ReadonlyArray<readonly [string, number]> = [["pen", 3], ["book", 20], ["tv", 600]]

const prices: Record<string, number> = todo()
const expensive: Record<string, number> = todo()
const expensiveNames: Array<string> = todo()

check("prices", prices, { pen: 3, book: 20, tv: 600 })
check("expensive", expensive, { book: 20, tv: 600 })
check("names", expensiveNames, ["book", "tv"])
