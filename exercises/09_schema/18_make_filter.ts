/**
 * Schema.makeFilter(f) builds a rule from your own function. f receives the
 * value and returns:
 *
 *   undefined        the value is fine
 *   "some message"   the value is rejected, with that message
 *
 * Goal: an even number.
 */
// I AM NOT DONE
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Even: Schema.Codec<number> = todo()

const error = thrown(() => Schema.decodeUnknownSync(Even)(3))
check("even", Schema.decodeUnknownSync(Even)(4), 4)
check("odd", error instanceof Error ? error.message : "no error", "must be even")
