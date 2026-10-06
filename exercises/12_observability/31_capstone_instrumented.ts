/**
 * Bring the chapter together.
 *
 * placeOrder(qty) is a traced operation:
 *  - it runs in a span called "placeOrder" (Effect.fn does that)
 *  - it reads MAX_QTY from the configuration (an integer, default 3)
 *  - it records the quantity as the span attribute "qty"
 *  - when qty is above the limit it fails with TooMany and counts a rejection
 *  - otherwise it logs "order placed" with the annotation { qty } and counts an order
 *  - it finishes with "ok"
 */
// I AM NOT DONE
import { ConfigProvider, Config, Data, Effect, Metric } from "effect"
import { check } from "../../src/check.ts"
import { recordLogs, recordSpans } from "../../src/observe.ts"
import { todo } from "../../src/todo.ts"

class TooMany extends Data.TaggedError("TooMany")<{ readonly qty: number }> {}

const orders = Metric.counter("orders")
const rejections = Metric.counter("rejections")

const placeOrder: (qty: number) => Effect.Effect<"ok", TooMany | Config.ConfigError> = todo()

const { logs, layer } = recordLogs()
const { spans, tracer } = recordSpans()
const run = <A, E>(program: Effect.Effect<A, E>, config: unknown = {}) =>
  Effect.runPromiseExit(
    program.pipe(
      Effect.provide(layer),
      Effect.provide(ConfigProvider.layer(ConfigProvider.fromUnknown(config))),
      Effect.withTracer(tracer)
    )
  )

const ok = await run(placeOrder(2))
check("a small order succeeds", ok._tag === "Success" ? ok.value : "failed", "ok")
const tooMany = await run(placeOrder(5))
check("a large order is rejected", tooMany._tag, "Failure")
const allowed = await run(placeOrder(5), { MAX_QTY: "10" })
check("the limit is configurable", allowed._tag === "Success" ? allowed.value : "failed", "ok")

check("spans", spans.map((s) => s.name), ["placeOrder", "placeOrder", "placeOrder"])
check("span attributes", spans.map((s) => s.attributes.qty), [2, 5, 5])
check("logs", logs.map((l) => [l.message, l.annotations]), [["order placed", { qty: 2 }], ["order placed", { qty: 5 }]])
check(
  "metrics",
  await Effect.runPromise(Effect.all([Metric.value(orders), Metric.value(rejections)]).pipe(Effect.map(([o, r]) => [o.count, r.count]))),
  [2, 1]
)
