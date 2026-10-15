/**
 * A trace shows where time goes inside one request. It is made of spans:
 * named, timed pieces of work, nested like function calls.
 *
 *   Effect.withSpan("name")      run the program inside a span
 *
 * A Tracer decides where spans are sent (OpenTelemetry and so on). The test
 * installs a recording one with Effect.withTracer; no real tracing setup is
 * needed to learn the idea.
 *
 * Goal: wrap the work in a span called "load-user".
 */
// I AM NOT DONE
import { Effect } from "effect"
import { recordSpans } from "../../src/observe.ts"

const loadUser = Effect.succeed("ada")

const traced: Effect.Effect<string> = todo()

const { spans, tracer } = recordSpans()
check("result", await Effect.runPromise(traced.pipe(Effect.withTracer(tracer))), "ada")
check("spans", spans.map((s) => s.name), ["load-user"])
