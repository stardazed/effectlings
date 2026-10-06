//#title Exact values
//#kind complete
//#teaches Schema.Literal, Schema.Literals
//#hint Literal is for one exact value, Literals for a set of them.
//#hint Schema.Literal("v1") and Schema.Literals(["draft", "published"])
/**
 *   Schema.Literal("v1")                 exactly the value "v1"
 *   Schema.Literals(["draft", "done"])   one of these exact values
 *
 * The TypeScript type is the literal union: "draft" | "done".
 *
 * Goal: a version marker and a status.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const Version = Schema.Literal("v1")
const Status = Schema.Literals(["draft", "published"])
//#exercise
const Version: Schema.Codec<"v1"> = todo()
const Status: Schema.Codec<"draft" | "published"> = todo()
//#end

check("version", Schema.decodeUnknownSync(Version)("v1"), "v1")
check("wrong version", thrown(() => Schema.decodeUnknownSync(Version)("v2")) !== undefined, true)
check("status", Schema.decodeUnknownSync(Status)("draft"), "draft")
check("another status", Schema.decodeUnknownSync(Status)("published"), "published")
check("unknown status", thrown(() => Schema.decodeUnknownSync(Status)("archived")) !== undefined, true)
