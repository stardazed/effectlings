/**
 * Sometimes the choice of which effect to build depends on something that
 * can change between runs. Effect.suspend delays that choice until the
 * program runs.
 *
 *   Effect.suspend(() => someEffect)
 *
 * Goal: `status` succeeds with "on" while mode is "on", and fails with
 * "off" while mode is "off". The same `status` value is run twice.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let mode: "on" | "off" = "on"

const status: Effect.Effect<string, string> = todo()

check("while on", await Effect.runPromise(status), "on")
mode = "off"
check("while off", await rejection(Effect.runPromise(status)), "off")
