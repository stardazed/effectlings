//#title Sorting with an Order
//#kind complete
//#teaches Arr.sort, Order.Number, Order.String
//#hint Arr.sort takes an Order, and Order.Number or Order.String are ready-made ones.
//#hint pipe(ns, Arr.sort(Order.Number))
/**
 * JavaScript's default sort compares numbers as text ([10, 9, 1] sorts as
 * [1, 10, 9]). Effect sorts by an explicit Order:
 *
 *   Order.Number     numeric order
 *   Order.String     alphabetical order
 *
 *   pipe(items, Arr.sort(order))   returns a new sorted array
 *
 * Goal: sort numbers and sort words.
 */
import { Array as Arr, Order, pipe } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const sortNumbers = (ns: ReadonlyArray<number>): Array<number> => pipe(ns, Arr.sort(Order.Number))
const sortWords = (ws: ReadonlyArray<string>): Array<string> => pipe(ws, Arr.sort(Order.String))
//#exercise
const sortNumbers = (ns: ReadonlyArray<number>): Array<number> => todo()
const sortWords = (ws: ReadonlyArray<string>): Array<string> => todo()
//#end

check("numbers", sortNumbers([10, 9, 1]), [1, 9, 10])
check("words", sortWords(["pear", "apple", "fig"]), ["apple", "fig", "pear"])
