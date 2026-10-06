/**
 * A pipeline is a list of small steps. Each step receives the result of
 * the one before it.
 *
 * Goal: turn "  hello " into "HELLO!" with three separate map steps
 * (trim, then upper case, then add an exclamation mark).
 */
import { Effect } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const raw = Effect.succeed("  hello ")

const shout: Effect.Effect<string> = raw.pipe(
  Effect.map((s) => s.trim()),
  Effect.map((s) => s.toUpperCase()),
  Effect.map((s) => s + "!")
)

check("shout", Effect.runSync(shout), "HELLO!")
