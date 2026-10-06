//#title The brand protects you
//#kind fix
//#deepens Schema.brand, Schema.decodeUnknownSync
//#hint loadUser wants a UserId, not any string. Turn the string into a UserId first.
//#hint loadUser(Schema.decodeUnknownSync(UserId)("u_7"))
/**
 * A function that takes a UserId will not accept a plain string. That is
 * the point: nobody can forget to validate.
 *
 * Goal: fix the call. Get a UserId by decoding.
 */
import { Schema } from "effect"
import { check } from "../../src/check.ts"

const UserId = Schema.String.pipe(Schema.brand("UserId"))
type UserId = typeof UserId.Type

const loadUser = (id: UserId): string => `user for ${id}`

//#solution
const result = loadUser(Schema.decodeUnknownSync(UserId)("u_7"))
//#exercise
const result = loadUser("u_7")
//#end

check("result", result, "user for u_7")
