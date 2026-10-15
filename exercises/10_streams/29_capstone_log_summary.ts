/**
 * A log arrives in chunks of text. Each line looks like "LEVEL message",
 * for example "ERROR disk full". Some lines are blank.
 *
 * summarize(chunks) produces the number of lines per level as
 * { info, warn, error }. Levels are INFO, WARN and ERROR; lines with any
 * other level are ignored.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"

type Level = "info" | "warn" | "error"
type Counts = Record<Level, number>

const summarize = (chunks: ReadonlyArray<string>): Effect.Effect<Counts> => todo()

check(
  "summary",
  await Effect.runPromise(
    summarize(["INFO started\nWARN slow que", "ry\n\nERROR disk full\nINFO stopped\nDEBUG ignored\n"])
  ),
  { info: 2, warn: 1, error: 1 }
)
check("empty log", await Effect.runPromise(summarize([])), { info: 0, warn: 0, error: 0 })
