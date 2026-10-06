//#title Only as much as needed
//#kind complete
//#teaches Stream.tap
//#deepens Stream.iterate, Stream.take
//#hint tap runs an effect for each value as it passes, like Effect.tap. Only values that are pulled pass through it.
//#hint The stream stops after 3 values, so the tap sees 3.
/**
 * Stream.tap(f) runs an effect for every value, without changing it.
 * Because streams are lazy, values that nobody asks for are never produced.
 *
 * Predict how many values the tap sees.
 */
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const seen: Array<number> = []

await Effect.runPromise(
  Stream.iterate(1, (n) => n + 1).pipe(
    Stream.tap((n) => Effect.sync(() => { seen.push(n) })),
    Stream.take(3),
    Stream.runCollect
  )
)

//#solution
const expected: Array<number> = [1, 2, 3]
//#exercise
const expected: Array<number> = todo()
//#end

check("what the tap saw", seen, expected)
