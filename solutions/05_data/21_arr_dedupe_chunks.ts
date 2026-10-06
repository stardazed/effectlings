/**
 *   Arr.dedupe(items)        remove repeated values, keeping first appearances
 *   Arr.chunksOf(items, n)   split into arrays of at most n elements
 *
 * Goal: use both.
 */
import { Array as Arr } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const unique = (ns: ReadonlyArray<number>): Array<number> => Arr.dedupe(ns)
const pages = (ns: ReadonlyArray<number>): Array<Array<number>> => Arr.chunksOf(ns, 2)

check("unique", unique([1, 2, 1, 3, 2]), [1, 2, 3])
check("pages", pages([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
