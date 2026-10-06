//#title null in the data, Option in the program
//#kind complete
//#teaches Schema.OptionFromNullOr
//#hint OptionFromNullOr wraps the schema of the value that may be present.
//#hint Schema.OptionFromNullOr(Schema.String)
/**
 * The data has null for "no value". Your program prefers Option.
 * Schema.OptionFromNullOr(schema) converts both ways:
 *
 *   decode   null -> none      "x" -> some("x")
 *   encode   none -> null      some("x") -> "x"
 *
 * Goal: a nickname that is an Option in your program.
 */
import { Option, Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const Nickname = Schema.OptionFromNullOr(Schema.String)
//#exercise
const Nickname: Schema.Codec<Option.Option<string>, string | null> = todo()
//#end

check("null becomes none", Schema.decodeUnknownSync(Nickname)(null), Option.none())
check("a string becomes some", Schema.decodeUnknownSync(Nickname)("ace"), Option.some("ace"))
check("none encodes to null", Schema.encodeSync(Nickname)(Option.none()), null)
check("some encodes to the value", Schema.encodeSync(Nickname)(Option.some("ace")), "ace")
