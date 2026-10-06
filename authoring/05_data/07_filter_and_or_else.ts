//#title Filtering and falling back
//#kind complete
//#teaches Option.filter, Option.orElse
//#hint filter turns a some into none when the predicate is false.
//#hint age.pipe(Option.filter((a) => a >= 18)) and primary.pipe(Option.orElse(() => backup))
/**
 *   option.pipe(Option.filter(predicate))     some stays some only if predicate is true
 *   option.pipe(Option.orElse(() => other))   if empty, use another Option instead
 *
 * Goal: keep only adult ages, and pick the primary value or else the backup.
 */
import { Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const adultAge = (age: Option.Option<number>): Option.Option<number> => age.pipe(Option.filter((a) => a >= 18))
const primaryOrBackup = (primary: Option.Option<string>, backup: Option.Option<string>): Option.Option<string> =>
  primary.pipe(Option.orElse(() => backup))
//#exercise
const adultAge = (age: Option.Option<number>): Option.Option<number> => todo()
const primaryOrBackup = (primary: Option.Option<string>, backup: Option.Option<string>): Option.Option<string> => todo()
//#end

check("adult", adultAge(Option.some(30)), Option.some(30))
check("minor", adultAge(Option.some(12)), Option.none())
check("no age", adultAge(Option.none()), Option.none())
check("primary wins", primaryOrBackup(Option.some("a"), Option.some("b")), Option.some("a"))
check("backup used", primaryOrBackup(Option.none(), Option.some("b")), Option.some("b"))
check("both empty", primaryOrBackup(Option.none(), Option.none()), Option.none())
