//#title Accepting effects that can fail
//#kind fix
//#deepens Effect.Effect, Effect.runPromise, Effect.fail
//#hint The parameter type says the task never fails, but you pass one that can.
//#hint Widen the parameter: Effect.Effect<number, string>
/**
 * An Effect<number> (E = never) fits wherever an Effect<number, string>
 * is expected, because never is assignable to everything. The reverse is
 * false: a task that may fail does not fit a parameter that says it cannot.
 *
 * When you write a function that accepts effects, describe the widest
 * thing it can handle.
 *
 * Goal: make both calls compile.
 */
import { Effect } from "effect"
import { check, rejection } from "../../src/check.ts"

//#solution
const runIt = (task: Effect.Effect<number, string>): Promise<number> => Effect.runPromise(task)
//#exercise
const runIt = (task: Effect.Effect<number>): Promise<number> => Effect.runPromise(task)
//#end

check("safe task", await runIt(Effect.succeed(1)), 1)
check("failing task", await rejection(runIt(Effect.fail("x"))), "x")
