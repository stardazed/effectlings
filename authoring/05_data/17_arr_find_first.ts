//#title Finding an element
//#kind complete
//#teaches Arr.findFirst
//#hint findFirst takes the array and a predicate, and returns an Option.
//#hint Arr.findFirst(people, (p) => p.age >= 18)
/**
 * Arr.findFirst(items, predicate) returns the first match as an Option.
 * No more `undefined`.
 *
 * Goal: find the first adult.
 */
import { Array as Arr, Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

interface Person {
  readonly name: string
  readonly age: number
}

//#solution
const firstAdult = (people: ReadonlyArray<Person>): Option.Option<Person> => Arr.findFirst(people, (p) => p.age >= 18)
//#exercise
const firstAdult = (people: ReadonlyArray<Person>): Option.Option<Person> => todo()
//#end

const ada = { name: "Ada", age: 36 }
check("found", firstAdult([{ name: "Kid", age: 9 }, ada, { name: "Old", age: 80 }]), Option.some(ada))
check("nobody", firstAdult([{ name: "Kid", age: 9 }]), Option.none())
