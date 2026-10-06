//#title Defining a service
//#kind fix
//#teaches Context.Service
//#deepens Effect.provideService
//#hint A service class extends Context.Service<Self, Shape>() and then takes a string id.
//#hint class Greeter extends Context.Service<Greeter, { readonly greet: (name: string) => string }>()("Greeter") {}
/**
 * A service is an interface your code asks for, separate from the code that
 * provides it. That separation is what makes programs easy to test and to
 * reconfigure. You define one with a class:
 *
 *   class Greeter extends Context.Service<Greeter, {
 *     readonly greet: (name: string) => string
 *   }>()("Greeter") {}
 *
 * Three parts: the class name again as the first type argument, the shape of
 * the service as the second, and a unique string id at the end.
 *
 * Inside a generator you ask for it with `yield* Greeter`. The program's R
 * slot then contains Greeter, exactly as you saw in the types chapter.
 *
 * Goal: make Greeter a service.
 */
import { Context, Effect } from "effect"
import { check } from "../../src/check.ts"

//#solution
class Greeter extends Context.Service<Greeter, {
  readonly greet: (name: string) => string
}>()("Greeter") {}
//#exercise
class Greeter {}
//#end

const program = Effect.gen(function*() {
  const greeter = yield* Greeter
  return greeter.greet("ada")
})

const result = Effect.runSync(program.pipe(Effect.provideService(Greeter, { greet: (name) => `hello ${name}` })))
check("result", result, "hello ada")
