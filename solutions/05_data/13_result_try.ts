/**
 * Result.try is the plain-value sibling of Effect.try. It runs the code
 * right away and returns a Result.
 *
 * Goal: parse JSON into a Result. Invalid input is the failure "invalid json".
 */
import { Result } from "effect"

const parse = (input: string): Result.Result<unknown, string> =>
  Result.try({ try: () => JSON.parse(input) as unknown, catch: () => "invalid json" })

check("valid", parse('{"a":1}'), Result.succeed({ a: 1 }))
check("invalid", parse("{"), Result.fail("invalid json"))
