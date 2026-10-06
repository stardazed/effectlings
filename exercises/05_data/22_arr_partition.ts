/**
 * Arr.partition(items, f) splits an array in two. For every item, f
 * returns a Result: a failure puts the item in the first group, a success
 * puts it in the second.
 *
 *   [itemsThatFailed, itemsThatSucceeded]
 *
 * The failing group comes first, the same order you saw in Effect.partition.
 *
 * Goal: split numbers into odds (the failures) and evens (the successes).
 */
// I AM NOT DONE
import { Array as Arr, Result } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const oddsAndEvens = (ns: ReadonlyArray<number>): [Array<number>, Array<number>] => todo()

check("split", oddsAndEvens([1, 2, 3, 4, 5]), [[1, 3, 5], [2, 4]])
