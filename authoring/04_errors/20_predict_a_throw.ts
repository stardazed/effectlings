//#title What does a throw become?
//#kind complete
//#deepens Effect.sync, Effect.gen, Effect.try, Effect.die
//#hint Nobody declared these throws in E, except one of the three.
//#hint sync and gen: the throw is a defect. try: the throw is turned into a failure by catch.
/**
 * Exceptions thrown by ordinary code inside Effect follow one rule:
 *
 *   Effect.try(...)      the throw is caught and becomes a typed failure
 *   anywhere else        the throw becomes a defect (like Effect.die)
 *
 * Predict what each program below ends with, then fill in your predictions.
 * `fails` means it ended with an expected failure. `dies` means a defect.
 */
import { Effect } from "effect"
import { causeKind, check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const thrownInSync = Effect.sync(() => {
  throw new Error("oops")
})
const thrownInGen = Effect.gen(function*() {
  if (Math.random() < 2) throw new Error("oops")
  return 1
})
const thrownInTry = Effect.try({
  try: () => {
    throw new Error("oops")
  },
  catch: () => "expected"
})

type Kind = { fails: boolean; dies: boolean }

//#solution
const expectedSync: Kind = { fails: false, dies: true }
const expectedGen: Kind = { fails: false, dies: true }
const expectedTry: Kind = { fails: true, dies: false }
//#exercise
const expectedSync: Kind = todo()
const expectedGen: Kind = todo()
const expectedTry: Kind = todo()
//#end

check("throw inside Effect.sync", await causeKind(thrownInSync), expectedSync)
check("throw inside Effect.gen", await causeKind(thrownInGen), expectedGen)
check("throw inside Effect.try", await causeKind(thrownInTry), expectedTry)
