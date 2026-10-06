/**
 * Helpers that let exercises look at logs and spans without printing them.
 * You do not need to read this file to do the exercises.
 */
import { Logger, Option, References, Tracer } from "effect"

export interface RecordedLog {
  readonly level: string
  readonly message: string
  readonly annotations: Record<string, unknown>
  readonly spans: ReadonlyArray<string>
}

/** A logger that records every log line, and the layer that installs it. */
export const recordLogs = () => {
  const logs: Array<RecordedLog> = []
  const logger = Logger.make<unknown, void>((options) => {
    const parts = Array.isArray(options.message) ? options.message : [options.message]
    logs.push({
      level: options.logLevel,
      message: parts.map(String).join(" "),
      annotations: { ...options.fiber.getRef(References.CurrentLogAnnotations) },
      spans: options.fiber.getRef(References.CurrentLogSpans).map(([label]) => label)
    })
  })
  return { logs, layer: Logger.layer([logger]) }
}

export interface RecordedSpan {
  readonly name: string
  readonly parent: string | undefined
  readonly attributes: Record<string, unknown>
}

/** A tracer that records every span that is started. Install it with Effect.withTracer(tracer). */
export const recordSpans = () => {
  const spans: Array<RecordedSpan> = []
  const tracer = Tracer.make({
    ...Tracer.nativeTracer,
    span: (options) => {
      const span = Tracer.nativeTracer.span(options)
      const recorded: RecordedSpan = {
        name: options.name,
        parent: Option.isSome(options.parent) ? (options.parent.value as { name?: string }).name : undefined,
        attributes: {}
      }
      spans.push(recorded)
      const attribute = span.attribute.bind(span)
      span.attribute = (key, value) => {
        recorded.attributes[key] = value
        attribute(key, value)
      }
      return span
    }
  })
  return { spans, tracer }
}
