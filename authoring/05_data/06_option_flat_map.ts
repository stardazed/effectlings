//#title Chaining lookups with flatMap
//#kind complete
//#teaches Option.flatMap
//#hint Each step returns an Option, so use flatMap, not map.
//#hint findUser(id).pipe(Option.flatMap((u) => u.address), Option.flatMap((a) => a.city))
/**
 * Option.flatMap(f) is for a step that itself returns an Option. If any
 * step is none, the whole chain is none, with no null checks in sight.
 *
 * Goal: find the city of a user, when every level may be missing.
 */
import { Option } from "effect"

interface Address {
  readonly city: Option.Option<string>
}
interface User {
  readonly address: Option.Option<Address>
}

const users = new Map<number, User>([
  [1, { address: Option.some({ city: Option.some("Paris") }) }],
  [2, { address: Option.some({ city: Option.none() }) }],
  [3, { address: Option.none() }]
])
const findUser = (id: number): Option.Option<User> => Option.fromNullishOr(users.get(id))

//#solution
const cityOf = (id: number): Option.Option<string> =>
  findUser(id).pipe(
    Option.flatMap((user) => user.address),
    Option.flatMap((address) => address.city)
  )
//#exercise
const cityOf = (id: number): Option.Option<string> => todo()
//#end

check("full chain", cityOf(1), Option.some("Paris"))
check("no city", cityOf(2), Option.none())
check("no address", cityOf(3), Option.none())
check("no user", cityOf(9), Option.none())
