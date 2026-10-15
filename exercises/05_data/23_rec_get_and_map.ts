/**
 * Same idea as arrays: `import { Record as Rec } from "effect"`.
 *
 *   Rec.get(record, key)      an Option, none when the key is absent
 *   Rec.map(record, f)        apply f to every value, keep the keys
 *
 * Goal: look up a price and double every price.
 */
// I AM NOT DONE
import { Option, Record as Rec } from "effect"

const prices: Record<string, number> = { pen: 3, book: 20 }

const priceOf = (sku: string): Option.Option<number> => todo()
const doubled: Record<string, number> = todo()

check("known", priceOf("pen"), Option.some(3))
check("unknown", priceOf("kiwi"), Option.none())
check("doubled", doubled, { pen: 6, book: 40 })
