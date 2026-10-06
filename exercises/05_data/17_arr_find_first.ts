/**
 * Arr.findFirst(items, predicate) returns the first match as an Option.
 * No more `undefined`.
 *
 * Goal: find the first adult.
 */
// I AM NOT DONE
import { Array as Arr, Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

interface Person {
  readonly name: string
  readonly age: number
}

const firstAdult = (people: ReadonlyArray<Person>): Option.Option<Person> => todo()

const ada = { name: "Ada", age: 36 }
check("found", firstAdult([{ name: "Kid", age: 9 }, ada, { name: "Old", age: 80 }]), Option.some(ada))
check("nobody", firstAdult([{ name: "Kid", age: 9 }]), Option.none())
