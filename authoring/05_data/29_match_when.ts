//#title Match on values and types
//#kind complete
//#teaches Match.value, Match.when, Match.string, Match.number, Match.orElse
//#hint Match.value(input) starts a match on one value. Each Match.when has a pattern and a handler.
//#hint Match.value(input).pipe(Match.when(Match.string, (s) => ...), Match.when(Match.number, (n) => ...), Match.orElse(() => "something else"))
/**
 * Match.value(x) matches one value now (Match.type builds a reusable function).
 *
 *   Match.when(pattern, handler)   a case; Match.string and Match.number are patterns
 *   Match.orElse(handler)          the catch-all, when the cases are not exhaustive
 *
 * Goal: describe an unknown input as "text: ...", "number: ..." or "something else".
 */
import { Match } from "effect"

//#solution
const describe = (input: unknown): string =>
  Match.value(input).pipe(
    Match.when(Match.string, (s) => `text: ${s}`),
    Match.when(Match.number, (n) => `number: ${n}`),
    Match.orElse(() => "something else")
  )
//#exercise
const describe = (input: unknown): string => todo()
//#end

check("string", describe("hi"), "text: hi")
check("number", describe(7), "number: 7")
check("other", describe(true), "something else")
