//#title Match by tag
//#kind complete
//#teaches Match.type, Match.tag, Match.exhaustive
//#hint Start with Match.type<Shape>(), then one Match.tag per case, then Match.exhaustive.
//#hint Match.type<Shape>().pipe(Match.tag("Circle", (c) => ...), Match.tag("Square", (s) => ...), Match.exhaustive)
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

type Shape = Data.TaggedEnum<{
  Circle: { readonly radius: number }
  Square: { readonly side: number }
}>
const { Circle, Square } = Data.taggedEnum<Shape>()

//#solution
const area: (shape: Shape) => number = Match.type<Shape>().pipe(
  Match.tag("Circle", (c) => c.radius * c.radius * 3),
  Match.tag("Square", (s) => s.side * s.side),
  Match.exhaustive
)
//#exercise
const area: (shape: Shape) => number = todo()
//#end

check("circle", area(Circle({ radius: 2 })), 12)
check("square", area(Square({ side: 3 })), 9)
