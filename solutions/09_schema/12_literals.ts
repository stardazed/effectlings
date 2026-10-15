/**
 *   Schema.Literal("v1")                 exactly the value "v1"
 *   Schema.Literals(["draft", "done"])   one of these exact values
 *
 * The TypeScript type is the literal union: "draft" | "done".
 *
 * Goal: a version marker and a status.
 */
import { Schema } from "effect"

const Version: Schema.Codec<"v1"> = Schema.Literal("v1")
const Status: Schema.Codec<"draft" | "published"> = Schema.Literals(["draft", "published"])

check("version", Schema.decodeUnknownSync(Version)("v1"), "v1")
check("wrong version", thrown(() => Schema.decodeUnknownSync(Version)("v2")) !== undefined, true)
check("status", Schema.decodeUnknownSync(Status)("draft"), "draft")
check("another status", Schema.decodeUnknownSync(Status)("published"), "published")
check("unknown status", thrown(() => Schema.decodeUnknownSync(Status)("archived")) !== undefined, true)
