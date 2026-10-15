//#title Two spellings of the same call
//#kind complete
//#deepens Effect.map, .pipe
//#hint The effect itself moves to the first argument.
//#hint Effect.map(price, (n) => n * 2)
/**
 * Most Effect functions can be written two ways:
 *
 *   price.pipe(Effect.map(f))     "data-last", reads left to right
 *   Effect.map(price, f)          "data-first", a plain function call
 *
 * They mean exactly the same thing. Pipe style shines when you chain
 * several steps. Data-first is fine for a single step.
 *
 * Goal: write `doubled` in data-first style and `tripled` in pipe style.
 */
import { Effect } from "effect"

const price = Effect.succeed(10)

//#solution
const doubled: Effect.Effect<number> = Effect.map(price, (n) => n * 2)
const tripled: Effect.Effect<number> = price.pipe(Effect.map((n) => n * 3))
//#exercise
const doubled: Effect.Effect<number> = todo()
const tripled: Effect.Effect<number> = todo()
//#end

check("doubled", Effect.runSync(doubled), 20)
check("tripled", Effect.runSync(tripled), 30)
