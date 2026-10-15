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

const logged: Array<string> = []
const base = Effect.succeed(100)

const label: (extra: number) => Effect.Effect<string> = Effect.fn("label")(
  function*(extra: number) {
    const b = yield* base
    return b + extra
  },
  Effect.map((n) => `total=${n}`),
  Effect.tap((text) => Effect.sync(() => { logged.push(text) }))
)

check("result", Effect.runSync(label(5)), "total=105")
check("logged", logged, ["total=105"])
