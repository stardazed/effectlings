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
// I AM NOT DONE
import { Effect, Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Settings: Schema.Codec<
  { readonly host: string; readonly retries: number },
  { readonly host: string; readonly retries?: number }
> = todo()

const decode = Schema.decodeUnknownSync(Settings)

check("default used", decode({ host: "localhost" }), { host: "localhost", retries: 3 })
check("value kept", decode({ host: "localhost", retries: 5 }), { host: "localhost", retries: 5 })
