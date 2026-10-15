/**
 *   Arr.dedupe(items)        remove repeated values, keeping first appearances
 *   Arr.chunksOf(items, n)   split into arrays of at most n elements
 *
 * Goal: use both.
 */
// I AM NOT DONE
import { Array as Arr } from "effect"

const unique = (ns: ReadonlyArray<number>): Array<number> => todo()
const pages = (ns: ReadonlyArray<number>): Array<Array<number>> => todo()

check("unique", unique([1, 2, 1, 3, 2]), [1, 2, 3])
check("pages", pages([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
