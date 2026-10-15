/**
 * A span name says what ran. Attributes say with what: which user, how many
 * rows. Effect.annotateCurrentSpan(key, value) adds one to the span that is
 * currently running.
 *
 * Goal: inside the "load-user" span, record the user id as an attribute.
 */
import { Effect } from "effect"
import { recordSpans } from "../../src/observe.ts"

const loadUser = (id: string) =>
  Effect.gen(function*() {
    yield* Effect.annotateCurrentSpan("userId", id)
    return `user-${id}`
  }).pipe(Effect.withSpan("load-user"))

const { spans, tracer } = recordSpans()
check("result", await Effect.runPromise(loadUser("u1").pipe(Effect.withTracer(tracer))), "user-u1")
check("attributes", spans[0].attributes, { userId: "u1" })
