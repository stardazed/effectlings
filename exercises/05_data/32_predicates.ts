/**
 * A predicate is a function that returns a boolean. The Predicate module
 * has ready-made ones and combinators:
 *
 *   Predicate.isString, Predicate.isNumber, ...
 *   Predicate.and(p, q)   Predicate.or(p, q)   Predicate.not(p)
 *
 * Goal: build three predicates.
 */
// I AM NOT DONE
import { Predicate } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const isEven: Predicate.Predicate<number> = (n) => n % 2 === 0
const isSmall: Predicate.Predicate<number> = (n) => n < 10

const isSmallEven: Predicate.Predicate<number> = todo()
const isStringOrNumber: Predicate.Predicate<unknown> = todo()
const isNotString: Predicate.Predicate<unknown> = todo()

check("small even", [isSmallEven(4), isSmallEven(12), isSmallEven(3)], [true, false, false])
check("string or number", [isStringOrNumber("a"), isStringOrNumber(1), isStringOrNumber(true)], [true, true, false])
check("not string", [isNotString("a"), isNotString(1)], [false, true])
