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

const Nickname: Schema.Codec<Option.Option<string>, string | null> = Schema.OptionFromNullOr(Schema.String)

check("null becomes none", Schema.decodeUnknownSync(Nickname)(null), Option.none())
check("a string becomes some", Schema.decodeUnknownSync(Nickname)("ace"), Option.some("ace"))
check("none encodes to null", Schema.encodeSync(Nickname)(Option.none()), null)
check("some encodes to the value", Schema.encodeSync(Nickname)(Option.some("ace")), "ace")
