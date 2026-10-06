/**
 * Plain TypeScript:
 *
 *   const city = user?.address?.city ?? "unknown"
 *
 * Write the same with Option. Each `?.` is a step that may produce nothing,
 * and `??` supplies the default.
 */
// I AM NOT DONE
import { Option } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

interface User {
  readonly address?: { readonly city?: string } | null
}

const cityOf = (user: User | null | undefined): string => todo()

check("full", cityOf({ address: { city: "Paris" } }), "Paris")
check("no city", cityOf({ address: {} }), "unknown")
check("null address", cityOf({ address: null }), "unknown")
check("no user", cityOf(undefined), "unknown")
