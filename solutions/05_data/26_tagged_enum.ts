/**
 * Data.TaggedEnum describes a union where every case has a `_tag`.
 * Data.taggedEnum<Shape>() gives you a constructor per case, plus `$is`
 * to test a case:
 *
 *   type Shape = Data.TaggedEnum<{
 *     Circle: { readonly radius: number }
 *     Square: { readonly side: number }
 *   }>
 *   const { Circle, Square, $is } = Data.taggedEnum<Shape>()
 *
 *   Circle({ radius: 1 })          { _tag: "Circle", radius: 1 }
 *   shapes.filter($is("Circle"))   only the circles
 *
 * Goal: build a list of shapes and count the circles.
 */
import { Data } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

type Shape = Data.TaggedEnum<{
  Circle: { readonly radius: number }
  Square: { readonly side: number }
}>
const { Circle, Square, $is } = Data.taggedEnum<Shape>()

const shapes: ReadonlyArray<Shape> = [Circle({ radius: 1 }), Square({ side: 2 }), Circle({ radius: 3 })]
const circleCount: number = shapes.filter($is("Circle")).length

check("three shapes", shapes.length, 3)
check("tags", shapes.map((s) => s._tag), ["Circle", "Square", "Circle"])
check("circle count", circleCount, 2)
