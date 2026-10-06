/**
 * Effect.void is a program that does nothing and finishes with undefined.
 * Its type is Effect<void>. Use it as a placeholder when a branch has
 * nothing to do.
 *
 * Goal: define `done`.
 */
// I AM NOT DONE
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const done: Effect.Effect<void> = todo()

check("finishes with undefined", Effect.runSync(done), undefined)
