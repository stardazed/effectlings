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

const User = Schema.Struct({ name: Schema.String, age: Schema.Number })
const isUser = Schema.is(User)

check("a user", isUser({ name: "Ada", age: 36 }), true)
check("missing age", isUser({ name: "Ada" }), false)
check("wrong type", isUser({ name: "Ada", age: "36" }), false)
check("not an object", isUser(null), false)
