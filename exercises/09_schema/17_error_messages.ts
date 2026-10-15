/**
 * When a rule fails, the error says which rule. You can replace the text
 * with `message`:
 *
 *   Schema.isGreaterThan(0, { message: "must be positive" })
 *
 * Goal: a quantity is a number greater than 0, reported as "must be positive".
 */
// I AM NOT DONE
import { Schema } from "effect"

const Quantity: Schema.Codec<number> = todo()

const error = thrown(() => Schema.decodeUnknownSync(Quantity)(-1))
check("valid", Schema.decodeUnknownSync(Quantity)(3), 3)
check("message", error instanceof Error ? error.message : "no error", "must be positive")
