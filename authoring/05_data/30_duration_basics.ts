//#title Durations
//#kind complete
//#teaches Duration.Duration, Duration.millis, Duration.seconds, Duration.minutes, Duration.sum, Duration.toMillis
//#hint Build each part with Duration.minutes and Duration.seconds, then add them with Duration.sum.
//#hint Duration.toMillis(Duration.sum(Duration.minutes(1), Duration.seconds(30)))
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
import { Duration } from "effect"

//#solution
const minuteAndAHalf: Duration.Duration = Duration.sum(Duration.minutes(1), Duration.seconds(30))
const inMillis: number = Duration.toMillis(minuteAndAHalf)
const tick: Duration.Duration = Duration.millis(50)
//#exercise
const minuteAndAHalf: Duration.Duration = todo()
const inMillis: number = todo()
const tick: Duration.Duration = todo()
//#end

check("milliseconds", inMillis, 90_000)
check("two seconds", Duration.toMillis(Duration.seconds(2)), 2000)
check("tick", Duration.toMillis(tick), 50)
