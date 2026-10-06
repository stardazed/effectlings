/**
 *   DateTime.add(dt, { days: 20 })        later
 *   DateTime.subtract(dt, { weeks: 1 })   earlier
 *   DateTime.startOf(dt, "month")         the first instant of that month
 *   DateTime.endOf(dt, "day")             the last millisecond of that day
 *
 * Every function returns a NEW value. The original is never changed.
 *
 * Goal: compute four dates from `start`.
 */
import { DateTime } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const start = DateTime.makeUnsafe("2026-01-15T10:30:00Z")

const inTwentyDays = DateTime.add(start, { days: 20 })
const aWeekAgo = DateTime.subtract(start, { weeks: 1 })
const firstOfMonth = DateTime.startOf(start, "month")
const endOfDay = DateTime.endOf(start, "day")

check("in twenty days", DateTime.formatIso(inTwentyDays), "2026-02-04T10:30:00.000Z")
check("a week ago", DateTime.formatIso(aWeekAgo), "2026-01-08T10:30:00.000Z")
check("start of month", DateTime.formatIso(firstOfMonth), "2026-01-01T00:00:00.000Z")
check("end of day", DateTime.formatIso(endOfDay), "2026-01-15T23:59:59.999Z")
check("the original is unchanged", DateTime.formatIso(start), "2026-01-15T10:30:00.000Z")
