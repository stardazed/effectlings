//#title Adding steps after the generator
//#kind complete
//#deepens Effect.fn, Effect.map, Effect.tap
//#hint Effect.fn accepts more arguments after the generator. Each one is applied to the result.
//#hint Effect.fn("x")(function*..., Effect.map(...), Effect.tap(...))
/**
 * Effect.fn takes the generator first, and then any number of extra
 * steps, just like the arguments of `.pipe`. Do NOT call .pipe on the
 * function; pass the steps as further arguments.
 *
 *   Effect.fn("name")(
 *     function*(x: number) { ... },
 *     Effect.map((result) => ...),
 *     Effect.tap((result) => ...)
 *   )
 *
 * Goal: after computing the raw sum, format it as text and record the
 * text in `logged`.
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const logged: Array<string> = []
const base = Effect.succeed(100)

//#solution
const label = Effect.fn("label")(
  function*(extra: number) {
    const b = yield* base
    return b + extra
  },
  Effect.map((n) => `total=${n}`),
  Effect.tap((text) => Effect.sync(() => { logged.push(text) }))
)
//#exercise
const label: (extra: number) => Effect.Effect<string> = todo()
//#end

check("result", Effect.runSync(label(5)), "total=105")
check("logged", logged, ["total=105"])
