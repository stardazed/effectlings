/**
 * Plain TypeScript:
 *
 *   const price = await fetchPrice(sku).catch(() => 0)
 *   const label = await fetchPrice(sku).then((p) => `$${p}`, () => "n/a")
 *
 * Write both, starting from the Effect `fetchPrice`.
 */
import { Effect } from "effect"

const fetchPrice = (sku: string): Effect.Effect<number, string> =>
  sku === "pen" ? Effect.succeed(3) : Effect.fail("no such sku")

const price = (sku: string): Effect.Effect<number> => fetchPrice(sku).pipe(Effect.orElseSucceed(() => 0))
const label = (sku: string): Effect.Effect<string> =>
  fetchPrice(sku).pipe(Effect.match({ onFailure: () => "n/a", onSuccess: (p) => `$${p}` }))

check("price of a pen", await Effect.runPromise(price("pen")), 3)
check("price of an unknown sku", await Effect.runPromise(price("kiwi")), 0)
check("label of a pen", await Effect.runPromise(label("pen")), "$3")
check("label of an unknown sku", await Effect.runPromise(label("kiwi")), "n/a")
