/**
 * A function that takes a UserId will not accept a plain string. That is
 * the point: nobody can forget to validate.
 *
 * Goal: fix the call. Get a UserId by decoding.
 */
// I AM NOT DONE
import { Schema } from "effect"

const UserId = Schema.String.pipe(Schema.brand("UserId"))
type UserId = typeof UserId.Type

const loadUser = (id: UserId): string => `user for ${id}`

const result = loadUser("u_7")

check("result", result, "user for u_7")
