/**
 * Data from outside often leaves fields out. A decoding default fills in
 * the gap, so your program always sees a value:
 *
 *   schema.pipe(Schema.withDecodingDefaultKey(Effect.succeed(default)))
 *
 * Encoded: the key is optional. Type: the key is always there.
 *
 * Goal: retries defaults to 3.
 */
import { Effect, Schema } from "effect"

const Settings: Schema.Codec<{ readonly host: string; readonly retries: number }, { readonly host: string; readonly retries?: number }> =
  Schema.Struct({
    host: Schema.String,
    retries: Schema.Number.pipe(Schema.withDecodingDefaultKey(Effect.succeed(3)))
  })

const decode = Schema.decodeUnknownSync(Settings)

check("default used", decode({ host: "localhost" }), { host: "localhost", retries: 3 })
check("value kept", decode({ host: "localhost", retries: 5 }), { host: "localhost", retries: 5 })
