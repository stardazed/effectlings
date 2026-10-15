//#title Splitting in two
//#kind complete
//#teaches Arr.partition
//#hint The function returns a Result for each item: succeed for the first group, fail for the second.
//#hint Arr.partition(ns, (n) => ... ? Result.succeed(n) : Result.fail(n))
/**
 * Arr.partition(items, f) splits an array in two. For every item, f
 * returns a Result: a success puts the item in the first group, a failure
 * puts it in the second.
 *
 *   [itemsThatSucceeded, itemsThatFailed]
 *
 * The succeeding group comes first, the same order you saw in Effect.partition.
 *
 * Goal: split numbers into odds (the successes) and evens (the failures).
 */
import { Array as Arr, Result } from "effect"

//#solution
const oddsAndEvens = (ns: ReadonlyArray<number>): [Array<number>, Array<number>] =>
  Arr.partition(ns, (n) => (n % 2 === 0 ? Result.fail(n) : Result.succeed(n)))
//#exercise
const oddsAndEvens = (ns: ReadonlyArray<number>): [Array<number>, Array<number>] => todo()
//#end

check("split", oddsAndEvens([1, 2, 3, 4, 5]), [[1, 3, 5], [2, 4]])
