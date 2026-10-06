//#title Splitting in two
//#kind complete
//#teaches Arr.partition
//#hint The function returns a Result for each item: succeed for one group, fail for the other.
//#hint Arr.partition(ns, (n) => n % 2 === 0 ? Result.succeed(n) : Result.fail(n))
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
import { Array as Arr, Result } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const oddsAndEvens = (ns: ReadonlyArray<number>): [Array<number>, Array<number>] =>
  Arr.partition(ns, (n) => (n % 2 === 0 ? Result.succeed(n) : Result.fail(n)))
//#exercise
const oddsAndEvens = (ns: ReadonlyArray<number>): [Array<number>, Array<number>] => todo()
//#end

check("split", oddsAndEvens([1, 2, 3, 4, 5]), [[1, 3, 5], [2, 4]])
