/**
 * Option<A> is a value that is either there or not:
 *
 *   Option.some(3)    there is a value, and it is 3
 *   Option.none()     there is no value
 *
 * It replaces null and undefined. The difference is that the type forces
 * every caller to deal with the "not there" case.
 *
 * Goal: return the first even number, or nothing.
 */
// I AM NOT DONE
import { Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const firstEven = (ns: ReadonlyArray<number>): Option.Option<number> => todo()

check("found", firstEven([1, 4, 6]), Option.some(4))
check("not found", firstEven([1, 3]), Option.none())
check("empty", firstEven([]), Option.none())
