//#title Effect.fn already traces
//#kind complete
//#deepens Effect.fn, Effect.withTracer
//#hint Effect.fn("name") creates a span called "name" every time the function runs.
//#hint Just write the function with Effect.fn("loadOrder"); no withSpan is needed.
/**
 * The name you give to Effect.fn is not decoration: every call of the
 * function runs inside a span with that name. That is why this course
 * has used Effect.fn("name") for functions all along. You get tracing,
 * and better stack traces, for free.
 *
 * Goal: write loadOrder with Effect.fn so that calling it produces a
 * "loadOrder" span. The function returns "order-<id>".
 */
import { Effect } from "effect"
import { recordSpans } from "../../src/observe.ts"

//#solution
const loadOrder: (id: number) => Effect.Effect<string> = Effect.fn("loadOrder")((id: number) => Effect.succeed(`order-${id}`))
//#exercise
const loadOrder: (id: number) => Effect.Effect<string> = todo()
//#end

const { spans, tracer } = recordSpans()
check("result", await Effect.runPromise(loadOrder(7).pipe(Effect.withTracer(tracer))), "order-7")
check("a span was created", spans.map((s) => s.name), ["loadOrder"])
