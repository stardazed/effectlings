//#title Collecting failures instead of stopping
//#kind complete
//#teaches Effect.partition
//#hint partition takes the items and a function that returns an Effect for each.
//#hint Effect.partition(ns, validate)
/**
 * Effect.forEach stops at the first failure. Effect.partition runs every
 * item and gives you both piles:
 *
 *   Effect.partition(items, f)   ->   [failures, successes]
 *
 * The failures come first. The result itself never fails.
 *
 * Goal: validate every number and return both groups.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const validate = (n: number): Effect.Effect<number, string> =>
  n % 2 === 0 ? Effect.fail(`bad ${n}`) : Effect.succeed(n)

//#solution
const sorted = (ns: ReadonlyArray<number>): Effect.Effect<[Array<string>, Array<number>]> =>
  Effect.partition(ns, validate)
//#exercise
const sorted = (ns: ReadonlyArray<number>): Effect.Effect<[Array<string>, Array<number>]> => todo()
//#end

check("mixed", await Effect.runPromise(sorted([1, 2, 3, 4])), [["bad 2", "bad 4"], [1, 3]])
check("empty", await Effect.runPromise(sorted([])), [[], []])
