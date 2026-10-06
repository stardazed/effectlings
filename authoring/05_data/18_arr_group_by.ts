//#title Grouping
//#kind complete
//#teaches Arr.groupBy
//#hint groupBy takes the items and a function that returns the group key as a string.
//#hint Arr.groupBy(words, (w) => String(w.length))
/**
 * Arr.groupBy(items, keyOf) puts the items into a record, one array per key.
 *
 * Goal: group words by their length.
 */
import { Array as Arr } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const byLength = (words: ReadonlyArray<string>): Record<string, Array<string>> =>
  Arr.groupBy(words, (w) => String(w.length))
//#exercise
const byLength = (words: ReadonlyArray<string>): Record<string, Array<string>> => todo()
//#end

check("grouped", byLength(["a", "bb", "cc", "d"]), { "1": ["a", "d"], "2": ["bb", "cc"] })
check("empty", byLength([]), {})
