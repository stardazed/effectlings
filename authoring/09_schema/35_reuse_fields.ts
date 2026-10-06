//#title Reusing fields
//#kind complete
//#teaches Schema.fieldsAssign
//#hint A Struct remembers its fields in .fields. fieldsAssign adds more.
//#hint Person.pipe(Schema.fieldsAssign({ company: Schema.String })) and Schema.Struct({ name: Person.fields.name })
/**
 * Every Struct keeps its fields in `.fields`, so you can build related
 * schemas without repeating yourself:
 *
 *   Person.fields.name                         one field's schema
 *   Person.pipe(Schema.fieldsAssign({ ... }))  the same struct with extra fields
 *
 * Goal: Employee is a Person with a company. NameOnly has just the name.
 */
import { Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })

//#solution
const Employee = Person.pipe(Schema.fieldsAssign({ company: Schema.String }))
const NameOnly = Schema.Struct({ name: Person.fields.name })
//#exercise
const Employee: Schema.Codec<{ readonly name: string; readonly age: number; readonly company: string }> = todo()
const NameOnly: Schema.Codec<{ readonly name: string }> = todo()
//#end

check(
  "employee",
  Schema.decodeUnknownSync(Employee)({ name: "Ada", age: 36, company: "Analytical" }),
  { name: "Ada", age: 36, company: "Analytical" }
)
check("name only", Schema.decodeUnknownSync(NameOnly)({ name: "Ada", age: 36 }), { name: "Ada" })
