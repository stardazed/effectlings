/**
 *   DateTime.isGreaterThan(a, b)   is a later than b?
 *   DateTime.distance(a, b)        the Duration from a to b
 *
 * Goal: say whether a deadline has passed, and how many minutes lie between
 * two times.
 */
import { DateTime, Duration } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const hasPassed = (deadline: DateTime.Utc, now: DateTime.Utc): boolean => DateTime.isGreaterThan(now, deadline)
const minutesBetween = (from: DateTime.Utc, to: DateTime.Utc): number =>
  Duration.toMillis(DateTime.distance(from, to)) / 60_000

const nine = DateTime.makeUnsafe("2026-01-15T09:00:00Z")
const ten = DateTime.makeUnsafe("2026-01-15T10:00:00Z")

check("deadline passed", hasPassed(nine, ten), true)
check("deadline not yet passed", hasPassed(ten, nine), false)
check("minutes between", minutesBetween(nine, ten), 60)
