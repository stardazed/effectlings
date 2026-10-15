/**
 * Arr.groupBy(items, keyOf) puts the items into a record, one array per key.
 *
 * Goal: group words by their length.
 */
import { Array as Arr } from "effect"

const byLength = (words: ReadonlyArray<string>): Record<string, Array<string>> =>
  Arr.groupBy(words, (w) => String(w.length))

check("grouped", byLength(["a", "bb", "cc", "d"]), { "1": ["a", "d"], "2": ["bb", "cc"] })
check("empty", byLength([]), {})
