//#title Spans nest
//#kind complete
//#deepens Effect.withSpan, Effect.gen, yield*
//#hint A span started while another is running becomes its child automatically.
//#hint Wrap the child steps in their own withSpan, and the whole generator in the parent's.
/**
 * Spans form a tree without any extra work: when you start a span inside
 * another, it is recorded as the child.
 *
 * Goal: a "checkout" span that contains two child spans, "charge" then "email".
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { recordSpans } from "../../src/observe.ts"
import { todo } from "../../src/todo.ts"

const charge = Effect.succeed("charged")
const email = Effect.succeed("emailed")

//#solution
const checkout = Effect.gen(function*() {
  yield* charge.pipe(Effect.withSpan("charge"))
  yield* email.pipe(Effect.withSpan("email"))
}).pipe(Effect.withSpan("checkout"))
//#exercise
const checkout: Effect.Effect<void> = todo()
//#end

const { spans, tracer } = recordSpans()
await Effect.runPromise(checkout.pipe(Effect.withTracer(tracer)))
check("the tree", spans.map((s) => `${s.parent ?? "(root)"} > ${s.name}`), [
  "(root) > checkout",
  "checkout > charge",
  "checkout > email"
])
