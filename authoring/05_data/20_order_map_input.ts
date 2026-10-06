//#title Sorting records by a field
//#kind complete
//#teaches Order.mapInput
//#hint mapInput adapts an Order for numbers into an Order for people, by saying how to get the number.
//#hint const byAge = Order.mapInput(Order.Number, (p: Person) => p.age)
/**
 * Order.mapInput(order, f) builds an Order for a bigger type from an
 * Order for a field: "compare people by comparing their ages".
 *
 *   const byAge = Order.mapInput(Order.Number, (p: Person) => p.age)
 *
 * Goal: sort people by age, youngest first.
 */
import { Array as Arr, Order, pipe } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

interface Person {
  readonly name: string
  readonly age: number
}

//#solution
const byAge = Order.mapInput(Order.Number, (p: Person) => p.age)
const youngestFirst = (people: ReadonlyArray<Person>): Array<Person> => pipe(people, Arr.sort(byAge))
//#exercise
const youngestFirst = (people: ReadonlyArray<Person>): Array<Person> => todo()
//#end

const names = youngestFirst([
  { name: "Old", age: 80 },
  { name: "Kid", age: 9 },
  { name: "Ada", age: 36 }
]).map((p) => p.name)
check("sorted names", names, ["Kid", "Ada", "Old"])
