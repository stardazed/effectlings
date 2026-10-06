/**
 * Result.try is the plain-value sibling of Effect.try. It runs the code
 * right away and returns a Result.
 *
 * Goal: parse JSON into a Result. Invalid input is the failure "invalid json".
 */
// I AM NOT DONE
import { Result } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const parse = (input: string): Result.Result<unknown, string> => todo()

check("valid", parse('{"a":1}'), Result.succeed({ a: 1 }))
check("invalid", parse("{"), Result.fail("invalid json"))
