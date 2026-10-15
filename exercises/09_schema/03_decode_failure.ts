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
// I AM NOT DONE
import { Schema } from "effect"

const Age = Schema.Number

const ageOrInvalid = (input: unknown): number | "invalid" => todo()

check("valid", ageOrInvalid(41), 41)
check("invalid", ageOrInvalid("41"), "invalid")
