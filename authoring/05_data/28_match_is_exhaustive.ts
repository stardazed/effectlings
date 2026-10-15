//#title Exhaustive means every case
//#kind fix
//#deepens Match.type, Match.tag, Match.exhaustive
//#hint Read the type error. A case of the union has no handler.
//#hint Add Match.tag("Triangle", (t) => t.base * t.height / 2) before Match.exhaustive.
/**
 * A new case was added to Shape and now `area` does not compile:
 * Match.exhaustive refuses to build a matcher that can miss a case.
 * This is the point of it. When the union grows, the compiler shows you
 * every place that must change.
 *
 * Goal: handle Triangle. Its area is base * height / 2.
 */
import { Data, Match } from "effect"

type Shape = Data.TaggedEnum<{
  Circle: { readonly radius: number }
  Square: { readonly side: number }
  Triangle: { readonly base: number; readonly height: number }
}>
const { Circle, Square, Triangle } = Data.taggedEnum<Shape>()

//#solution
const area = Match.type<Shape>().pipe(
  Match.tag("Circle", (c) => c.radius * c.radius * 3),
  Match.tag("Square", (s) => s.side * s.side),
  Match.tag("Triangle", (t) => (t.base * t.height) / 2),
  Match.exhaustive
)
//#exercise
const area = Match.type<Shape>().pipe(
  Match.tag("Circle", (c) => c.radius * c.radius * 3),
  Match.tag("Square", (s) => s.side * s.side),
  Match.exhaustive
)
//#end

check("circle", area(Circle({ radius: 2 })), 12)
check("square", area(Square({ side: 3 })), 9)
check("triangle", area(Triangle({ base: 4, height: 5 })), 10)
