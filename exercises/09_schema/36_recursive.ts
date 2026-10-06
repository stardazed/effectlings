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
// I AM NOT DONE
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

interface Category {
  readonly name: string
  readonly children: ReadonlyArray<Category>
}

const Category: Schema.Codec<Category> = todo()

const decode = Schema.decodeUnknownSync(Category)
const tree = { name: "root", children: [{ name: "a", children: [{ name: "a1", children: [] }] }, { name: "b", children: [] }] }

check("a nested tree", decode(tree), tree)
check("a bad node deep inside", thrown(() => decode({ name: "root", children: [{ name: 1, children: [] }] })) !== undefined, true)
