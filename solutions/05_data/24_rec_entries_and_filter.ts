/**
 *   Rec.fromEntries(pairs)        build a record from [key, value] pairs
 *   Rec.filter(record, pred)      keep the entries whose value passes
 *   Rec.keys(record)              the keys as an array
 *
 * Goal: build a price record, keep the expensive ones, list their names.
 */
import { Record as Rec } from "effect"

const pairs: ReadonlyArray<readonly [string, number]> = [["pen", 3], ["book", 20], ["tv", 600]]

const prices: Record<string, number> = Rec.fromEntries(pairs)
const expensive: Record<string, number> = Rec.filter(prices, (p) => p > 5)
const expensiveNames: Array<string> = Rec.keys(expensive)

check("prices", prices, { pen: 3, book: 20, tv: 600 })
check("expensive", expensive, { book: 20, tv: 600 })
check("names", expensiveNames, ["book", "tv"])
