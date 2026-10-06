/**
 *   Schema.optionalKey(schema)   the key can be missing, but if it is present it must fit
 *   Schema.optional(schema)      the key can be missing, or present as undefined
 *
 * TypeScript makes the same distinction between `a?: string` and
 * `a?: string | undefined`.
 *
 * Goal: nickname is an optionalKey of string. age is optional of number.
 */
// I AM NOT DONE
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Profile: Schema.Codec<{ readonly name: string; readonly nickname?: string; readonly age?: number | undefined }> = todo()

const decode = Schema.decodeUnknownSync(Profile)

check("both missing", decode({ name: "Ada" }), { name: "Ada" })
check("both present", decode({ name: "Ada", nickname: "ace", age: 36 }), { name: "Ada", nickname: "ace", age: 36 })
check("optional accepts undefined", decode({ name: "Ada", age: undefined }), { name: "Ada", age: undefined })
check("optionalKey rejects undefined", thrown(() => decode({ name: "Ada", nickname: undefined })) !== undefined, true)
