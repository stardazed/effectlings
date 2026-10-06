//#title Defaults when building values
//#kind fix
//#teaches Schema.withConstructorDefault
//#hint Settings.make({ host }) fails to compile because retries is required. Give retries a constructor default.
//#hint retries: Schema.Number.pipe(Schema.withConstructorDefault(Effect.succeed(3)))
/**
 * A Struct has a .make function that builds a value and validates it.
 * Decoding defaults apply to decoding. To let callers of .make leave a
 * field out, add a constructor default:
 *
 *   Schema.Number.pipe(Schema.withConstructorDefault(Effect.succeed(3)))
 *
 * Goal: Settings.make({ host: "localhost" }) should compile and give retries 3.
 */
import { Effect, Schema } from "effect"
import { check } from "../../src/check.ts"

//#solution
const Settings = Schema.Struct({
  host: Schema.String,
  retries: Schema.Number.pipe(Schema.withConstructorDefault(Effect.succeed(3)))
})
//#exercise
const Settings = Schema.Struct({
  host: Schema.String,
  retries: Schema.Number
})
//#end

const local = Settings.make({ host: "localhost" })
const custom = Settings.make({ host: "example.com", retries: 10 })

check("default", local, { host: "localhost", retries: 3 })
check("explicit", custom, { host: "example.com", retries: 10 })
