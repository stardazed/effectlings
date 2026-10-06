/**
 * The name you give to Effect.fn is not decoration: every call of the
 * function runs inside a span with that name. That is why this course
 * has used Effect.fn("name") for functions all along. You get tracing,
 * and better stack traces, for free.
 *
 * Goal: write loadOrder with Effect.fn so that calling it produces a
 * "loadOrder" span. The function returns "order-<id>".
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { recordSpans } from "../../src/observe.ts"
import { todo } from "../../src/todo.ts"

const loadOrder: (id: number) => Effect.Effect<string> = todo()

const { spans, tracer } = recordSpans()
check("result", await Effect.runPromise(loadOrder(7).pipe(Effect.withTracer(tracer))), "order-7")
check("a span was created", spans.map((s) => s.name), ["loadOrder"])
