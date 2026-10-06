//#title Tagged structs
//#kind complete
//#deepens Schema.Struct, Schema.Union
//#teaches Schema.TaggedStruct
//#hint TaggedStruct takes the tag first and the fields second, and adds the _tag field for you.
//#hint Schema.TaggedStruct("Circle", { radius: Schema.Number })
/**
 * Schema.TaggedStruct("Circle", fields) is a Struct with a fixed
 * `_tag: "Circle"` field. Union several of them and you get a tagged union
 * you can match on, just like the ones from the data chapter.
 *
 * Goal: write the two shapes. The union is given.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const Circle = Schema.TaggedStruct("Circle", { radius: Schema.Number })
const Square = Schema.TaggedStruct("Square", { side: Schema.Number })
//#exercise
const Circle: Schema.Codec<{ readonly _tag: "Circle"; readonly radius: number }> = todo()
const Square: Schema.Codec<{ readonly _tag: "Square"; readonly side: number }> = todo()
//#end

const Shape = Schema.Union([Circle, Square])
const decode = Schema.decodeUnknownSync(Shape)

check("a circle", decode({ _tag: "Circle", radius: 1 }), { _tag: "Circle", radius: 1 })
check("a square", decode({ _tag: "Square", side: 2 }), { _tag: "Square", side: 2 })
check("unknown tag", thrown(() => decode({ _tag: "Triangle", base: 1 })) !== undefined, true)
check("wrong field for the tag", thrown(() => decode({ _tag: "Circle", side: 1 })) !== undefined, true)
