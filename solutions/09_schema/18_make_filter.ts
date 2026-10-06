/**
 * Schema.makeFilter(f) builds a rule from your own function. f receives the
 * value and returns:
 *
 *   undefined        the value is fine
 *   "some message"   the value is rejected, with that message
 *
 * Goal: an even number.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Even = Schema.Number.check(Schema.makeFilter((n: number) => (n % 2 === 0 ? undefined : "must be even")))

const error = thrown(() => Schema.decodeUnknownSync(Even)(3))
check("even", Schema.decodeUnknownSync(Even)(4), 4)
check("odd", error instanceof Error ? error.message : "no error", "must be even")
