//#title Branded types
//#kind complete
//#teaches Schema.brand
//#hint brand is applied with pipe, and takes the name of the brand.
//#hint Schema.String.pipe(Schema.brand("UserId"))
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
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const UserId = Schema.String.check(Schema.isPattern(/^u_/)).pipe(Schema.brand("UserId"))
//#exercise
const UserId: Schema.Codec<string> = todo()
//#end

const userId = Schema.decodeUnknownSync(UserId)("u_42")

check("decoded", String(userId), "u_42")
check("rejected", thrown(() => Schema.decodeUnknownSync(UserId)("42")) !== undefined, true)
