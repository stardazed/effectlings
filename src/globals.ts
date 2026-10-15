/** Registers the exercise helpers as globals, so exercises need no imports for them. */
import * as checks from "./check.ts"
import { todo } from "./todo.ts"

Object.assign(globalThis, {
  check: checks.check,
  checkTrue: checks.checkTrue,
  rejection: checks.rejection,
  thrown: checks.thrown,
  causeKind: checks.causeKind,
  todo
})
