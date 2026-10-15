/**
 * Every Struct keeps its fields in `.fields`, so you can build related
 * schemas without repeating yourself:
 *
 *   Person.fields.name                         one field's schema
 *   Person.pipe(Schema.fieldsAssign({ ... }))  the same struct with extra fields
 *
 * Goal: Employee is a Person with a company. NameOnly has just the name.
 */
// I AM NOT DONE
import { Schema } from "effect"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })

const Employee: Schema.Codec<{ readonly name: string; readonly age: number; readonly company: string }> = todo()
const NameOnly: Schema.Codec<{ readonly name: string }> = todo()

check(
  "employee",
  Schema.decodeUnknownSync(Employee)({ name: "Ada", age: 36, company: "Analytical" }),
  { name: "Ada", age: 36, company: "Analytical" }
)
check("name only", Schema.decodeUnknownSync(NameOnly)({ name: "Ada", age: 36 }), { name: "Ada" })
