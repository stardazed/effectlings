/**
 * The Match module is a checked, expression-shaped switch:
 *
 *   const area = Match.type<Shape>().pipe(
 *     Match.tag("Circle", (c) => ...),
 *     Match.tag("Square", (s) => ...),
 *     Match.exhaustive
 *   )
 *
 * `area` is a function from Shape to the result. Match.exhaustive makes it
 * a compile error to forget a case.
 *
 * Goal: write area. Use radius * radius * 3 for circles (a rough pi).
 */
import { Data, Match } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

type Shape = Data.TaggedEnum<{
  Circle: { readonly radius: number }
  Square: { readonly side: number }
}>
const { Circle, Square } = Data.taggedEnum<Shape>()

const area = Match.type<Shape>().pipe(
  Match.tag("Circle", (c) => c.radius * c.radius * 3),
  Match.tag("Square", (s) => s.side * s.side),
  Match.exhaustive
)

check("circle", area(Circle({ radius: 2 })), 12)
check("square", area(Square({ side: 3 })), 9)
