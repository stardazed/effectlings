/**
 * Two objects with the same fields are still different objects, and === says so.
 * Classes that extend Data.Class compare by value with Equal.equals:
 *
 *   class Point extends Data.Class<{ readonly x: number; readonly y: number }> {}
 *   Equal.equals(new Point({ x: 1, y: 2 }), new Point({ x: 1, y: 2 }))   // true
 *
 * This is what makes such values safe to use in Sets, Maps and tests.
 *
 * Goal: make Point a Data.Class with fields x and y.
 */
import { Data, Equal } from "effect"

class Point extends Data.Class<{ readonly x: number; readonly y: number }> {}

const a = new Point({ x: 1, y: 2 })
const b = new Point({ x: 1, y: 2 })
const c = new Point({ x: 9, y: 2 })
check("different objects", a === b, false)
check("equal by value", Equal.equals(a, b), true)
check("different values", Equal.equals(a, c), false)
check("fields", [a.x, a.y], [1, 2])
