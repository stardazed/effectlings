/**
 * Schema.Class defines a class and its schema together:
 *
 *   class Person extends Schema.Class<Person>("Person")({
 *     name: Schema.String,
 *     age: Schema.Number
 *   }) {
 *     get isAdult() { return this.age >= 18 }     // methods and getters are allowed
 *   }
 *
 * `new Person({ ... })` validates its input. Decoding with the class as the
 * schema builds an INSTANCE, so its methods work on decoded data.
 *
 * Goal: give Person its fields.
 */
import { Schema } from "effect"
import { check } from "../../src/check.ts"

class Person extends Schema.Class<Person>("Person")({
  name: Schema.String,
  age: Schema.Number
}) {
  get isAdult(): boolean {
    return this.age >= 18
  }
}

const ada = new Person({ name: "Ada", age: 36 })
check("fields", [ada.name, ada.age], ["Ada", 36])
check("a getter", ada.isAdult, true)

const decoded = Schema.decodeUnknownSync(Person)({ name: "Kid", age: 9 })
check("decoding builds an instance", decoded instanceof Person, true)
check("so its methods work", decoded.isAdult, false)
