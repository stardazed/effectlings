/**
 * The SchemaTransformation module has ready-made conversions, such as
 * trim() and toLowerCase(). You attach them with Schema.decode.
 *
 * Goal: an email schema that trims and lower-cases whatever it receives.
 */
// I AM NOT DONE
import { Schema, SchemaTransformation } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Email: Schema.Codec<string> = todo()

check("cleaned", Schema.decodeUnknownSync(Email)("  Ada@Example.COM "), "ada@example.com")
check("already clean", Schema.decodeUnknownSync(Email)("ada@example.com"), "ada@example.com")
