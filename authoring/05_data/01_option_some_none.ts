//#title Maybe there is a value
//#kind complete
//#teaches Option.Option, Option.some, Option.none
//#hint Return Option.some(value) when you find one, Option.none() when you do not.
//#hint for (const n of ns) { if (n % 2 === 0) return Option.some(n) } return Option.none()
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
import { Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const firstEven = (ns: ReadonlyArray<number>): Option.Option<number> => {
  for (const n of ns) {
    if (n % 2 === 0) return Option.some(n)
  }
  return Option.none()
}
//#exercise
const firstEven = (ns: ReadonlyArray<number>): Option.Option<number> => todo()
//#end

check("found", firstEven([1, 4, 6]), Option.some(4))
check("not found", firstEven([1, 3]), Option.none())
check("empty", firstEven([]), Option.none())
