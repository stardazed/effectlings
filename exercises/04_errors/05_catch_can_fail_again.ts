/**
 * The handler of Effect.catch returns an Effect. That Effect may succeed
 * (recovering) or fail (translating one error into another). The new E is
 * whatever the handler can fail with.
 *
 * Goal: when the remote call times out, answer from the cache if the key is
 * there, otherwise fail with Unavailable.
 */
// I AM NOT DONE
import { Data, Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

class Timeout extends Data.TaggedError("Timeout")<{ readonly ms: number }> {}
class Unavailable extends Data.TaggedError("Unavailable")<{ readonly key: string }> {}

const cache: Record<string, string> = { a: "cached" }
const fetchRemote = (_key: string): Effect.Effect<string, Timeout> => Effect.fail(new Timeout({ ms: 100 }))

const get = (key: string): Effect.Effect<string, Unavailable> => todo()

check("cache hit", await Effect.runPromise(get("a")), "cached")
const error = await rejection(Effect.runPromise(get("b")))
check("cache miss fails with Unavailable", error instanceof Unavailable, true)
check("with the key", error instanceof Unavailable ? error.key : "", "b")
