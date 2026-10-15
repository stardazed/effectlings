//#title What a failed decode throws
//#kind complete
//#teaches Schema.isSchemaError
//#hint Wrap the decode in try/catch. A SchemaError means the input was bad; anything else is unexpected.
//#hint catch (error) { if (Schema.isSchemaError(error)) return "invalid"; throw error }
/**
 * decodeUnknownSync throws a SchemaError when the input does not fit. Its
 * message says what was wrong and where:
 *
 *   Expected number
 *     at ["age"]
 *
 * Schema.isSchemaError(value) tells a SchemaError from any other error.
 *
 * Goal: return the age, or "invalid" when the input is not a valid age.
 * Other errors must not be hidden.
 */
import { Schema } from "effect"

const Age = Schema.Number

//#solution
const ageOrInvalid = (input: unknown): number | "invalid" => {
  try {
    return Schema.decodeUnknownSync(Age)(input)
  } catch (error) {
    if (Schema.isSchemaError(error)) return "invalid"
    throw error
  }
}
//#exercise
const ageOrInvalid = (input: unknown): number | "invalid" => todo()
//#end

check("valid", ageOrInvalid(41), 41)
check("invalid", ageOrInvalid("41"), "invalid")
