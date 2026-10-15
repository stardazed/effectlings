//#title Cleaning input
//#kind complete
//#teaches SchemaTransformation.trim, SchemaTransformation.toLowerCase
//#hint Both are ready-made transformations. Attach each with Schema.decode.
//#hint Schema.String.pipe(Schema.decode(SchemaTransformation.<one>()), Schema.decode(SchemaTransformation.<other>()))
/**
 * The SchemaTransformation module has ready-made conversions, such as
 * trim() and toLowerCase(). You attach them with Schema.decode.
 *
 * Goal: an email schema that trims and lower-cases whatever it receives.
 */
import { Schema, SchemaTransformation } from "effect"

//#solution
const Email: Schema.Codec<string> = Schema.String.pipe(
  Schema.decode(SchemaTransformation.trim()),
  Schema.decode(SchemaTransformation.toLowerCase())
)
//#exercise
const Email: Schema.Codec<string> = todo()
//#end

check("cleaned", Schema.decodeUnknownSync(Email)("  Ada@Example.COM "), "ada@example.com")
check("already clean", Schema.decodeUnknownSync(Email)("ada@example.com"), "ada@example.com")
