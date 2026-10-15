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

const ageOrInvalid = (input: unknown): number | "invalid" => {
  try {
    return Schema.decodeUnknownSync(Age)(input)
  } catch (error) {
    if (Schema.isSchemaError(error)) return "invalid"
    throw error
  }
}

check("valid", ageOrInvalid(41), 41)
check("invalid", ageOrInvalid("41"), "invalid")
