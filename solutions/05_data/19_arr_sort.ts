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

const sortNumbers = (ns: ReadonlyArray<number>): Array<number> => pipe(ns, Arr.sort(Order.Number))
const sortWords = (ws: ReadonlyArray<string>): Array<string> => pipe(ws, Arr.sort(Order.String))

check("numbers", sortNumbers([10, 9, 1]), [1, 9, 10])
check("words", sortWords(["pear", "apple", "fig"]), ["apple", "fig", "pear"])
