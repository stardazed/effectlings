/**
 * APIs and databases often use null for "no value". Schema.NullOr(schema)
 * accepts either the schema's values or null. The field is still required:
 * it must be present, possibly as null.
 *
 * Goal: a Row with an id and a deletedAt that is a string or null.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Row = Schema.Struct({ id: Schema.Number, deletedAt: Schema.NullOr(Schema.String) })

const decode = Schema.decodeUnknownSync(Row)

check("null", decode({ id: 1, deletedAt: null }), { id: 1, deletedAt: null })
check("a string", decode({ id: 1, deletedAt: "2026-01-01" }), { id: 1, deletedAt: "2026-01-01" })
check("missing is not null", thrown(() => decode({ id: 1 })) !== undefined, true)
