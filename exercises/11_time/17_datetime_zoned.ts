/**
 * A UTC DateTime is one instant. A zoned DateTime is the same instant seen
 * in a time zone, with its local offset:
 *
 *   DateTime.makeZoned(input, { timeZone: "Europe/Paris" })   Option of a zoned DateTime
 *   DateTime.formatIsoZoned(zoned)                            ISO text with offset and zone
 *
 * Goal: show an instant in Paris, or none for an invalid date.
 */
// I AM NOT DONE
import { DateTime, Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const inParis = (input: string): Option.Option<string> => todo()

check("winter time", inParis("2026-01-15T10:30:00Z"), Option.some("2026-01-15T11:30:00.000+01:00[Europe/Paris]"))
check("summer time", inParis("2026-07-15T10:30:00Z"), Option.some("2026-07-15T12:30:00.000+02:00[Europe/Paris]"))
check("invalid", inParis("nope"), Option.none())
