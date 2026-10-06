/**
 * Match.value(x) matches one value now (Match.type builds a reusable function).
 *
 *   Match.when(pattern, handler)   a case; Match.string and Match.number are patterns
 *   Match.orElse(handler)          the catch-all, when the cases are not exhaustive
 *
 * Goal: describe an unknown input as "text: ...", "number: ..." or "something else".
 */
// I AM NOT DONE
import { Match } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const describe = (input: unknown): string => todo()

check("string", describe("hi"), "text: hi")
check("number", describe(7), "number: 7")
check("other", describe(true), "something else")
