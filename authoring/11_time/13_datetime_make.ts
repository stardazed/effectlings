//#title Dates as values
//#kind complete
//#teaches DateTime.Utc, DateTime.makeUnsafe, DateTime.make, DateTime.formatIso, DateTime.toEpochMillis
//#hint makeUnsafe throws on bad input. make returns an Option instead.
//#hint DateTime.makeUnsafe("2026-01-15T10:30:00Z"), DateTime.make(input), DateTime.formatIso(dt), DateTime.toEpochMillis(dt)
/**
 * JavaScript's Date is mutable and easy to misuse. The DateTime module has
 * immutable values:
 *
 *   DateTime.makeUnsafe(input)    a DateTime.Utc; throws if input is not a valid date
 *   DateTime.make(input)          an Option instead of throwing
 *   DateTime.formatIso(dt)        ISO 8601 text
 *   DateTime.toEpochMillis(dt)    milliseconds since 1970
 *
 * Goal: build a date, parse input safely, and read both representations.
 */
import { DateTime, Option } from "effect"

//#solution
const meeting: DateTime.Utc = DateTime.makeUnsafe("2026-01-15T10:30:00Z")
const parse = (input: string): Option.Option<DateTime.Utc> => DateTime.make(input)
const iso: string = DateTime.formatIso(meeting)
const millis: number = DateTime.toEpochMillis(meeting)
//#exercise
const meeting: DateTime.Utc = todo()
const parse = (input: string): Option.Option<DateTime.Utc> => todo()
const iso: string = todo()
const millis: number = todo()
//#end

check("iso", iso, "2026-01-15T10:30:00.000Z")
check("millis", millis, 1768473000000)
check("parse ok", Option.isSome(parse("2026-03-01")), true)
check("parse bad input", Option.isNone(parse("not a date")), true)
