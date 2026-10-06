//#title Translate: a hand-written type guard
//#kind translate
//#deepens Schema.Struct, Schema.is
//#hint The fields go into a Struct. The guard is Schema.is of that schema.
//#hint const User = Schema.Struct({ name: Schema.String, age: Schema.Number }); const isUser = Schema.is(User)
/**
 * Plain TypeScript:
 *
 *   interface User { name: string; age: number }
 *
 *   function isUser(x: unknown): x is User {
 *     return (
 *       typeof x === "object" && x !== null &&
 *       typeof (x as any).name === "string" &&
 *       typeof (x as any).age === "number"
 *     )
 *   }
 *
 * The guard repeats the type by hand, and they can drift apart. With a
 * schema you write the shape once and get both.
 */
import { Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const User = Schema.Struct({ name: Schema.String, age: Schema.Number })
const isUser = Schema.is(User)
//#exercise
const User: Schema.Codec<{ readonly name: string; readonly age: number }> = todo()
const isUser: (input: unknown) => boolean = todo()
//#end

check("a user", isUser({ name: "Ada", age: 36 }), true)
check("missing age", isUser({ name: "Ada" }), false)
check("wrong type", isUser({ name: "Ada", age: "36" }), false)
check("not an object", isUser(null), false)
