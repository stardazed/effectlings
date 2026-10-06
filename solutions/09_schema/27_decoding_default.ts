/**
 * Data from outside often leaves fields out. A decoding default fills in
 * the gap, so your program always sees a value:
 *
 *   Schema.optionalKey(schema).pipe(Schema.withDecodingDefaultKey(Effect.succeed(default)))
 *
 * Encoded: the key is optional. Type: the key is always there.
 *
 * Goal: retries defaults to 3.
 */
import { Effect, Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Settings = Schema.Struct({
  host: Schema.String,
  retries: Schema.optionalKey(Schema.Number).pipe(Schema.withDecodingDefaultKey(Effect.succeed(3)))
})

const decode = Schema.decodeUnknownSync(Settings)

check("default used", decode({ host: "localhost" }), { host: "localhost", retries: 3 })
check("value kept", decode({ host: "localhost", retries: 5 }), { host: "localhost", retries: 5 })
