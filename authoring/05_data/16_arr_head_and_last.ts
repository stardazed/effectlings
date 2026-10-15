//#title Safe first and last
//#kind complete
//#teaches Arr.head, Arr.last
//#hint Import the Array module under a new name so it does not hide the global Array.
//#hint [Arr.head(ns), Arr.last(ns)]
/**
 * The Array module from Effect is imported with an alias, so it does not
 * hide the global Array:
 *
 *   import { Array as Arr } from "effect"
 *
 * Its functions are pipeable, and they return Options where the plain
 * JavaScript version would give undefined or throw:
 *
 *   Arr.head(ns)    Option of the first element
 *   Arr.last(ns)    Option of the last element
 *
 * Goal: return both ends of an array.
 */
import { Array as Arr, Option } from "effect"

//#solution
const ends = (ns: ReadonlyArray<number>): [Option.Option<number>, Option.Option<number>] => [Arr.head(ns), Arr.last(ns)]
//#exercise
const ends = (ns: ReadonlyArray<number>): [Option.Option<number>, Option.Option<number>] => todo()
//#end

check("several", ends([1, 2, 3]), [Option.some(1), Option.some(3)])
check("one element", ends([7]), [Option.some(7), Option.some(7)])
check("empty", ends([]), [Option.none(), Option.none()])
