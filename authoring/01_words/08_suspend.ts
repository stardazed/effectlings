//#title Deciding at run time with suspend
//#kind complete
//#teaches Effect.suspend
//#hint suspend takes a function that returns an Effect. Put the if inside that function.
//#hint Effect.suspend(() => mode === "on" ? Effect.succeed("on") : Effect.fail("off"))
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
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

let mode: "on" | "off" = "on"

//#solution
const status: Effect.Effect<string, string> = Effect.suspend(() =>
  mode === "on" ? Effect.succeed("on") : Effect.fail("off")
)
//#exercise
const status: Effect.Effect<string, string> = todo()
//#end

check("while on", await Effect.runPromise(status), "on")
mode = "off"
check("while off", await rejection(Effect.runPromise(status)), "off")
