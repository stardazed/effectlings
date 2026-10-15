/**
 * A Struct has a .make function that builds a value and validates it.
 * Decoding defaults apply to decoding. To let callers of .make leave a
 * field out, add a constructor default:
 *
 *   Schema.Number.pipe(Schema.withConstructorDefault(Effect.succeed(3)))
 *
 * Goal: Settings.make({ host: "localhost" }) should compile and give retries 3.
 */
// I AM NOT DONE
import { Effect, Schema } from "effect"

const Settings = Schema.Struct({
  host: Schema.String,
  retries: Schema.Number
})

const local = Settings.make({ host: "localhost" })
const custom = Settings.make({ host: "example.com", retries: 10 })

check("default", local, { host: "localhost", retries: 3 })
check("explicit", custom, { host: "example.com", retries: 10 })
