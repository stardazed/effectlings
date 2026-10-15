import type * as checks from "./check.ts"
import type * as todos from "./todo.ts"
import type * as types from "./types.ts"

declare global {
  var check: typeof checks.check
  var checkTrue: typeof checks.checkTrue
  var rejection: typeof checks.rejection
  var thrown: typeof checks.thrown
  var causeKind: typeof checks.causeKind
  var todo: typeof todos.todo
  type Equal<X, Y> = types.Equal<X, Y>
  type Expect<T extends true> = types.Expect<T>
}
