/**
 * Plenty of existing code returns undefined for "not found": Map.get,
 * array find, optional fields. Option.fromNullishOr converts:
 *
 *   undefined or null   ->   Option.none()
 *   any other value     ->   Option.some(value)
 *
 * Goal: turn a Map lookup and an optional field into Options.
 */
import { Option } from "effect"

const prices = new Map([["pen", 3]])

const priceOf = (sku: string): Option.Option<number> => Option.fromNullishOr(prices.get(sku))
const nickname = (user: { readonly nickname?: string | null }): Option.Option<string> =>
  Option.fromNullishOr(user.nickname)

check("known sku", priceOf("pen"), Option.some(3))
check("unknown sku", priceOf("kiwi"), Option.none())
check("nickname present", nickname({ nickname: "ace" }), Option.some("ace"))
check("nickname null", nickname({ nickname: null }), Option.none())
check("nickname missing", nickname({}), Option.none())
