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
// I AM NOT DONE
import { Effect } from "effect"

const price = Effect.succeed(10)

const doubled: Effect.Effect<number> = todo()
const tripled: Effect.Effect<number> = todo()

check("doubled", Effect.runSync(doubled), 20)
check("tripled", Effect.runSync(tripled), 30)
