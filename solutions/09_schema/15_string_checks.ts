/**
 * A type can say "string". A schema can say what KIND of string.
 * Rules are added with .check(...):
 *
 *   Schema.isMinLength(n)    at least n characters
 *   Schema.isMaxLength(n)    at most n characters
 *   Schema.isPattern(regex)  matches the regular expression
 *
 * Goal: a username is 3 to 12 characters of lower case letters, digits and underscores.
 */
import { Schema } from "effect"

const Username: Schema.Codec<string> = Schema.String.check(Schema.isMinLength(3), Schema.isMaxLength(12), Schema.isPattern(/^[a-z0-9_]+$/))

const valid = (input: unknown): boolean => thrown(() => Schema.decodeUnknownSync(Username)(input)) === undefined

check("ok", valid("ada_99"), true)
check("too short", valid("ab"), false)
check("too long", valid("a".repeat(13)), false)
check("bad characters", valid("Ada!"), false)
check("not a string", valid(99999), false)
