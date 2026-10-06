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
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const seen: Array<number> = []
const source = Effect.succeed(21)

const observed: Effect.Effect<number> = source.pipe(
  Effect.tap((n) => Effect.sync(() => { seen.push(n) })),
  Effect.map((n) => n * 2)
)

check("result", Effect.runSync(observed), 42)
check("seen", seen, [21])
