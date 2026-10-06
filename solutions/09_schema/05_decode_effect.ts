/**
 * In Effect programs you want the failure in the E channel:
 *
 *   Schema.decodeUnknownEffect(schema)(input)   Effect<Type, Schema.SchemaError>
 *
 * SchemaError is a tagged error like the ones from the errors chapter, so
 * catchTag("SchemaError", ...) handles it.
 *
 * Goal: greet a decoded person, or answer "invalid person".
 */
import { Effect, Schema } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })

const decodePerson = (input: unknown): Effect.Effect<typeof Person.Type, Schema.SchemaError> =>
  Schema.decodeUnknownEffect(Person)(input)

const greet = (input: unknown): Effect.Effect<string> =>
  decodePerson(input).pipe(
    Effect.map((p) => `hello ${p.name}`),
    Effect.catchTag("SchemaError", () => Effect.succeed("invalid person"))
  )

check("valid", await Effect.runPromise(greet({ name: "Ada", age: 36 })), "hello Ada")
check("invalid", await Effect.runPromise(greet({ name: 1 })), "invalid person")
