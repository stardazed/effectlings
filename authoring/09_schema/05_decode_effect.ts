//#title Decoding inside Effect
//#kind complete
//#teaches Schema.decodeUnknownEffect, Schema.SchemaError
//#hint decodeUnknownEffect fails with a SchemaError, whose tag is "SchemaError".
//#hint decodePerson(input).pipe(Effect.map((p) => `hello ${p.name}`), Effect.catchTag("SchemaError", () => Effect.succeed("invalid person")))
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

const Person = Schema.Struct({ name: Schema.String, age: Schema.Number })

//#solution
const decodePerson = (input: unknown): Effect.Effect<typeof Person.Type, Schema.SchemaError> =>
  Schema.decodeUnknownEffect(Person)(input)

const greet = (input: unknown): Effect.Effect<string> =>
  decodePerson(input).pipe(
    Effect.map((p) => `hello ${p.name}`),
    Effect.catchTag("SchemaError", () => Effect.succeed("invalid person"))
  )
//#exercise
const decodePerson = (input: unknown): Effect.Effect<typeof Person.Type, Schema.SchemaError> => todo()
const greet = (input: unknown): Effect.Effect<string> => todo()
//#end

check("valid", await Effect.runPromise(greet({ name: "Ada", age: 36 })), "hello Ada")
check("invalid", await Effect.runPromise(greet({ name: 1 })), "invalid person")
