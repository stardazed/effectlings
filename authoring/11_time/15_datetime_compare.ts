//#title Comparing and measuring
//#kind complete
//#teaches DateTime.isGreaterThan, DateTime.distance
//#hint isGreaterThan(a, b) asks whether a is later than b. distance gives a Duration.
//#hint DateTime.isGreaterThan(now, deadline) and Duration.toMillis(DateTime.distance(from, to))
/**
 *   DateTime.isGreaterThan(a, b)   is a later than b?
 *   DateTime.distance(a, b)        the Duration from a to b
 *
 * Goal: say whether a deadline has passed, and how many minutes lie between
 * two times.
 */
import { DateTime, Duration } from "effect"

//#solution
const hasPassed = (deadline: DateTime.Utc, now: DateTime.Utc): boolean => DateTime.isGreaterThan(now, deadline)
const minutesBetween = (from: DateTime.Utc, to: DateTime.Utc): number =>
  Duration.toMillis(DateTime.distance(from, to)) / 60_000
//#exercise
const hasPassed = (deadline: DateTime.Utc, now: DateTime.Utc): boolean => todo()
const minutesBetween = (from: DateTime.Utc, to: DateTime.Utc): number => todo()
//#end

const nine = DateTime.makeUnsafe("2026-01-15T09:00:00Z")
const ten = DateTime.makeUnsafe("2026-01-15T10:00:00Z")

check("deadline passed", hasPassed(nine, ten), true)
check("deadline not yet passed", hasPassed(ten, nine), false)
check("minutes between", minutesBetween(nine, ten), 60)
