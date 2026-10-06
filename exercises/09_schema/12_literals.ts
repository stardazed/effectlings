/**
 *   Schema.Literal("v1")                 exactly the value "v1"
 *   Schema.Literals(["draft", "done"])   one of these exact values
 *
 * The TypeScript type is the literal union: "draft" | "done".
 *
 * Goal: a version marker and a status.
 */
// I AM NOT DONE
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Version: Schema.Codec<"v1"> = todo()
const Status: Schema.Codec<"draft" | "published"> = todo()

check("version", Schema.decodeUnknownSync(Version)("v1"), "v1")
check("wrong version", thrown(() => Schema.decodeUnknownSync(Version)("v2")) !== undefined, true)
check("status", Schema.decodeUnknownSync(Status)("draft"), "draft")
check("another status", Schema.decodeUnknownSync(Status)("published"), "published")
check("unknown status", thrown(() => Schema.decodeUnknownSync(Status)("archived")) !== undefined, true)
