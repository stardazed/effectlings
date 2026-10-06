//#title Wrapping code that can throw
//#kind complete
//#teaches Effect.try
//#hint Same shape as tryPromise: an object with try and catch.
//#hint Effect.try({ try: () => JSON.parse(input), catch: () => "invalid json" })
/**
 * Effect.try is the synchronous sibling of tryPromise. It catches
 * exceptions thrown by ordinary code.
 *
 *   Effect.try({ try: () => code that may throw, catch: (e) => yourError })
 *
 * Goal: parse JSON. Invalid input must fail with the string "invalid json".
 */
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const parse = (input: string): Effect.Effect<unknown, string> =>
  Effect.try({
    try: () => JSON.parse(input) as unknown,
    catch: () => "invalid json"
  })
//#exercise
const parse = (input: string): Effect.Effect<unknown, string> => todo()
//#end

check("valid json", await Effect.runPromise(parse('{"a":1}')), { a: 1 })
check("invalid json", await rejection(Effect.runPromise(parse("{"))), "invalid json")
