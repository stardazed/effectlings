//#title Peeking with tap
//#kind complete
//#teaches Effect.tap
//#hint tap runs an effect for its side effect and then passes the original value along.
//#hint Effect.tap((n) => Effect.sync(() => { seen.push(n) }))
/**
 * Effect.tap(f) runs an effect built from the result, then continues with
 * the original result. It is how you log, record or observe values
 * without changing them.
 *
 *   program.pipe(Effect.tap((value) => Effect.sync(() => console.log(value))))
 *
 * Goal: record every value that flows through in `seen`, without changing it.
 */
import { Effect } from "effect"

const seen: Array<number> = []
const source = Effect.succeed(21)

//#solution
const observed: Effect.Effect<number> = source.pipe(
  Effect.tap((n) => Effect.sync(() => { seen.push(n) })),
  Effect.map((n) => n * 2)
)
//#exercise
const observed: Effect.Effect<number> = todo() // record 21 in `seen`, then double it
//#end

check("result", Effect.runSync(observed), 42)
check("seen", seen, [21])
