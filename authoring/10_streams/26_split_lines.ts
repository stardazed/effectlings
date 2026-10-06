//#title Text in chunks
//#kind complete
//#teaches Stream.splitLines
//#hint Chunks of text arrive cut at arbitrary places. splitLines puts them back together into lines.
//#hint Stream.fromIterable(chunks).pipe(Stream.splitLines, Stream.runCollect)
/**
 * Files and network data arrive in chunks that can cut a line in two.
 * Stream.splitLines reassembles the chunks and emits one value per line.
 *
 * Goal: turn the chunks into lines.
 */
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const lines = (chunks: ReadonlyArray<string>): Effect.Effect<Array<string>> =>
  Stream.fromIterable(chunks).pipe(Stream.splitLines, Stream.runCollect)
//#exercise
const lines = (chunks: ReadonlyArray<string>): Effect.Effect<Array<string>> => todo()
//#end

check("lines", await Effect.runPromise(lines(["ab\nc", "d\nef"])), ["ab", "cd", "ef"])
