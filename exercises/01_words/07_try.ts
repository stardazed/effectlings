/**
 * Effect.try is the synchronous sibling of tryPromise. It catches
 * exceptions thrown by ordinary code.
 *
 *   Effect.try({ try: () => code that may throw, catch: (e) => yourError })
 *
 * Goal: parse JSON. Invalid input must fail with the string "invalid json".
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const parse = (input: string): Effect.Effect<unknown, string> => todo()

check("valid json", await Effect.runPromise(parse('{"a":1}')), { a: 1 })
check("invalid json", await rejection(Effect.runPromise(parse("{"))), "invalid json")
