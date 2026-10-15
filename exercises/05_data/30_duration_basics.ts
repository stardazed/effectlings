/**
 * A Duration is a length of time as a value, not a bare number of
 * milliseconds you have to remember the unit of.
 *
 *   Duration.seconds(2)   Duration.minutes(1)   Duration.millis(50)
 *   Duration.sum(a, b)    add two durations
 *   Duration.toMillis(d)  read it as milliseconds
 *
 * Goal: a minute and a half, as a Duration and in milliseconds,
 * and a 50 millisecond tick.
 */
// I AM NOT DONE
import { Duration } from "effect"

const minuteAndAHalf: Duration.Duration = todo()
const inMillis: number = todo()
const tick: Duration.Duration = todo()

check("milliseconds", inMillis, 90_000)
check("two seconds", Duration.toMillis(Duration.seconds(2)), 2000)
check("tick", Duration.toMillis(tick), 50)
