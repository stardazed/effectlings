/**
 * A UserId and an OrderId are both strings, and it is easy to pass one where
 * the other belongs. A brand makes the types different:
 *
 *   const UserId = Schema.String.pipe(Schema.brand("UserId"))
 *   type UserId = typeof UserId.Type        // string & Brand<"UserId">
 *
 * At runtime it is an ordinary string. Decoding is how a plain string earns
 * the brand, so the only way to get a UserId is through validation.
 *
 * Goal: define UserId. Give it a rule too: it must start with "u_".
 */
// I AM NOT DONE
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const UserId: Schema.Codec<string> = todo()

const userId = Schema.decodeUnknownSync(UserId)("u_42")

check("decoded", String(userId), "u_42")
check("rejected", thrown(() => Schema.decodeUnknownSync(UserId)("42")) !== undefined, true)
