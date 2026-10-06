//#title Combining predicates
//#kind complete
//#teaches Predicate.Predicate, Predicate.isString, Predicate.isNumber, Predicate.and, Predicate.or, Predicate.not
//#hint and, or and not combine predicates the way && || ! combine booleans.
//#hint Predicate.and(isEven, isSmall), Predicate.or(Predicate.isString, Predicate.isNumber), Predicate.not(Predicate.isString)
/**
 * A predicate is a function that returns a boolean. The Predicate module
 * has ready-made ones and combinators:
 *
 *   Predicate.isString, Predicate.isNumber, ...
 *   Predicate.and(p, q)   Predicate.or(p, q)   Predicate.not(p)
 *
 * Goal: build three predicates.
 */
import { Predicate } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const isEven: Predicate.Predicate<number> = (n) => n % 2 === 0
const isSmall: Predicate.Predicate<number> = (n) => n < 10

//#solution
const isSmallEven: Predicate.Predicate<number> = Predicate.and(isEven, isSmall)
const isStringOrNumber: Predicate.Predicate<unknown> = Predicate.or(Predicate.isString, Predicate.isNumber)
const isNotString: Predicate.Predicate<unknown> = Predicate.not(Predicate.isString)
//#exercise
const isSmallEven: Predicate.Predicate<number> = todo()
const isStringOrNumber: Predicate.Predicate<unknown> = todo()
const isNotString: Predicate.Predicate<unknown> = todo()
//#end

check("small even", [isSmallEven(4), isSmallEven(12), isSmallEven(3)], [true, false, false])
check("string or number", [isStringOrNumber("a"), isStringOrNumber(1), isStringOrNumber(true)], [true, true, false])
check("not string", [isNotString("a"), isNotString(1)], [false, true])
