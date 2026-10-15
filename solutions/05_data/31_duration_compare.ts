/**
 * Effect.sleep("20 millis") accepted text. That text is a Duration.Input:
 * a Duration, a number of milliseconds, or text like "2 seconds".
 *
 *   Duration.fromInput(input)          Option of a Duration (none if it cannot be parsed)
 *   Duration.isGreaterThan(a, b)       is a longer than b?
 *
 * Goal: report whether an input is longer than the limit. Unparseable
 * input counts as not longer.
 */
import { Duration, Option } from "effect"

const isSlow = (input: Duration.Input, limit: Duration.Duration): boolean =>
  Duration.fromInput(input).pipe(
    Option.map((d) => Duration.isGreaterThan(d, limit)),
    Option.getOrElse(() => false)
  )

const limit = Duration.seconds(1)
check("text longer", isSlow("2 seconds", limit), true)
check("text shorter", isSlow("500 millis", limit), false)
check("number of millis", isSlow(1500, limit), true)
check("a Duration", isSlow(Duration.millis(10), limit), false)
