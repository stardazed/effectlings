/**
 * Files and network data arrive in chunks that can cut a line in two.
 * Stream.splitLines reassembles the chunks and emits one value per line.
 *
 * Goal: turn the chunks into lines.
 */
// I AM NOT DONE
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const lines = (chunks: ReadonlyArray<string>): Effect.Effect<Array<string>> => todo()

check("lines", await Effect.runPromise(lines(["ab\nc", "d\nef"])), ["ab", "cd", "ef"])
