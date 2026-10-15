/**
 * Spans form a tree without any extra work: when you start a span inside
 * another, it is recorded as the child.
 *
 * Goal: a "checkout" span that contains two child spans, "charge" then "email".
 */
// I AM NOT DONE
import { Effect } from "effect"
import { recordSpans } from "../../src/observe.ts"

const charge = Effect.succeed("charged")
const email = Effect.succeed("emailed")

const checkout: Effect.Effect<void> = todo()

const { spans, tracer } = recordSpans()
await Effect.runPromise(checkout.pipe(Effect.withTracer(tracer)))
check("the tree", spans.map((s) => `${s.parent ?? "(root)"} > ${s.name}`), [
  "(root) > checkout",
  "checkout > charge",
  "checkout > email"
])
