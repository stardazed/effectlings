/**
 * Order.mapInput(order, f) builds an Order for a bigger type from an
 * Order for a field: "compare people by comparing their ages".
 *
 *   const byAge = Order.mapInput(Order.Number, (p: Person) => p.age)
 *
 * Goal: sort people by age, youngest first.
 */
// I AM NOT DONE
import { Array as Arr, Order, pipe } from "effect"

interface Person {
  readonly name: string
  readonly age: number
}

const youngestFirst = (people: ReadonlyArray<Person>): Array<Person> => todo()

const names = youngestFirst([
  { name: "Old", age: 80 },
  { name: "Kid", age: 9 },
  { name: "Ada", age: 36 }
]).map((p) => p.name)
check("sorted names", names, ["Kid", "Ada", "Old"])
