//#title Schemas that contain themselves
//#kind complete
//#teaches Schema.suspend
//#hint The children field is an array of the schema you are defining. Wrap the self-reference in Schema.suspend.
//#hint children: Schema.Array(Schema.suspend((): Schema.Codec<Category> => Category))
/**
 * A category contains categories. The schema must refer to itself, but a
 * constant cannot use itself while it is being defined. Schema.suspend
 * delays the reference:
 *
 *   Schema.suspend((): Schema.Codec<Category> => Category)
 *
 * TypeScript cannot infer a recursive type, so you write the interface
 * and annotate the schema.
 *
 * Goal: define the Category schema.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

interface Category {
  readonly name: string
  readonly children: ReadonlyArray<Category>
}

//#solution
const Category: Schema.Codec<Category> = Schema.Struct({
  name: Schema.String,
  children: Schema.Array(Schema.suspend((): Schema.Codec<Category> => Category))
})
//#exercise
const Category: Schema.Codec<Category> = todo()
//#end

const decode = Schema.decodeUnknownSync(Category)
const tree = { name: "root", children: [{ name: "a", children: [{ name: "a1", children: [] }] }, { name: "b", children: [] }] }

check("a nested tree", decode(tree), tree)
check("a bad node deep inside", thrown(() => decode({ name: "root", children: [{ name: 1, children: [] }] })) !== undefined, true)
