/**
 * Schema.TaggedClass<Self>()(tag, fields) is Schema.Class with a fixed
 * `_tag`. It is the class version of a tagged struct, and is convenient for
 * events and commands.
 *
 * Goal: make Deposit a tagged class with an amount.
 */
import { Schema } from "effect"

class Deposit extends Schema.TaggedClass<Deposit>()("Deposit", { amount: Schema.Number }) {}

const deposit = new Deposit({ amount: 5 })
check("tag", deposit._tag, "Deposit")
check("field", deposit.amount, 5)

const decoded = Schema.decodeUnknownSync(Deposit)({ _tag: "Deposit", amount: 7 })
check("decoding builds an instance", decoded instanceof Deposit, true)
