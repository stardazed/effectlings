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

const thrownInSync = Effect.sync(() => {
  throw new Error("oops")
})
const thrownInGen = Effect.gen(function*() {
  const n = yield* Effect.succeed(1)
  if (n > 0) throw new Error("oops")
  return n
})
const thrownInTry = Effect.try({
  try: () => {
    throw new Error("oops")
  },
  catch: () => "expected"
})

type Kind = { fails: boolean; dies: boolean }

const expectedSync: Kind = { fails: false, dies: true }
const expectedGen: Kind = { fails: false, dies: true }
const expectedTry: Kind = { fails: true, dies: false }

check("throw inside Effect.sync", await causeKind(thrownInSync), expectedSync)
check("throw inside Effect.gen", await causeKind(thrownInGen), expectedGen)
check("throw inside Effect.try", await causeKind(thrownInTry), expectedTry)
