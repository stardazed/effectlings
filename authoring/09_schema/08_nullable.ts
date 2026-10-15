//#title null is a value too
//#kind complete
//#teaches Schema.NullOr
//#hint NullOr wraps another schema and also allows null.
//#hint Schema.Struct({ id: Schema.Number, deletedAt: Schema.NullOr(Schema.String) })
/**
 * APIs and databases often use null for "no value". Schema.NullOr(schema)
 * accepts either the schema's values or null. The field is still required:
 * it must be present, possibly as null.
 *
 * Goal: a Row with an id and a deletedAt that is a string or null.
 */
import { Schema } from "effect"

//#solution
const Row: Schema.Codec<{ readonly id: number; readonly deletedAt: string | null }> =
  Schema.Struct({ id: Schema.Number, deletedAt: Schema.NullOr(Schema.String) })
//#exercise
const Row: Schema.Codec<{ readonly id: number; readonly deletedAt: string | null }> = todo()
//#end

const decode = Schema.decodeUnknownSync(Row)

check("null", decode({ id: 1, deletedAt: null }), { id: 1, deletedAt: null })
check("a string", decode({ id: 1, deletedAt: "2026-01-01" }), { id: 1, deletedAt: "2026-01-01" })
check("missing is not null", thrown(() => decode({ id: 1 })) !== undefined, true)
