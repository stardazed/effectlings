/**
 * Adult.make(value) does not only check types. It applies every rule, and
 * throws an Error ("Schema validation failed", with the details in its
 * `cause`) if one fails. So a value built with .make is known to be valid.
 *
 * Goal: register(name, age) answers "registered <name>" for an adult
 * (age 18 to 130), and "rejected" otherwise.
 */
import { Schema } from "effect"

const Adult = Schema.Struct({
  name: Schema.String,
  age: Schema.Number.check(Schema.isBetween({ minimum: 18, maximum: 130 }))
})

const register = (name: string, age: number): string => {
  try {
    Adult.make({ name, age })
    return `registered ${name}`
  } catch {
    return "rejected"
  }
}

check("an adult", register("Ada", 36), "registered Ada")
check("a minor", register("Kid", 9), "rejected")
check("too old", register("Methuselah", 969), "rejected")
