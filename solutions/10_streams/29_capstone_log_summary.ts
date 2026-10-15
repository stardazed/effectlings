/**
 * A log arrives in chunks of text. Each line looks like "LEVEL message",
 * for example "ERROR disk full". Some lines are blank.
 *
 * summarize(chunks) produces the number of lines per level as
 * { info, warn, error }. Levels are INFO, WARN and ERROR; lines with any
 * other level are ignored.
 */
import { Effect, Stream } from "effect"

type Level = "info" | "warn" | "error"
type Counts = Record<Level, number>

const summarize = (chunks: ReadonlyArray<string>): Effect.Effect<Counts> =>
  Stream.fromIterable(chunks).pipe(
    Stream.splitLines,
    Stream.filter((line) => line.trim() !== ""),
    Stream.map((line) => line.split(" ")[0].toLowerCase()),
    Stream.filter((level): level is Level => level === "info" || level === "warn" || level === "error"),
    Stream.runFold(
      (): Counts => ({ info: 0, warn: 0, error: 0 }),
      (counts: Counts, level: Level): Counts => ({ ...counts, [level]: counts[level] + 1 })
    )
  )

check(
  "summary",
  await Effect.runPromise(
    summarize(["INFO started\nWARN slow que", "ry\n\nERROR disk full\nINFO stopped\nDEBUG ignored\n"])
  ),
  { info: 2, warn: 1, error: 1 }
)
check("empty log", await Effect.runPromise(summarize([])), { info: 0, warn: 0, error: 0 })
