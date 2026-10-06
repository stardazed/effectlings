//#title Records with any keys
//#kind complete
//#teaches Schema.Record
//#hint Schema.Record takes a schema for the keys and a schema for the values.
//#hint Schema.Record(Schema.String, Schema.Number)
/**
 * Schema.Record(key, value) describes an object with arbitrary keys, like
 * a dictionary. Use Struct when you know the keys, Record when you do not.
 *
 * Goal: a schema for a dictionary from names to prices.
 */
import { Schema } from "effect"
import { check, thrown } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const Prices = Schema.Record(Schema.String, Schema.Number)
//#exercise
const Prices: Schema.Codec<{ readonly [key: string]: number }> = todo()
//#end

const decode = Schema.decodeUnknownSync(Prices)

check("prices", decode({ pen: 3, book: 20 }), { pen: 3, book: 20 })
check("empty", decode({}), {})
check("a bad value", thrown(() => decode({ pen: "3" })) !== undefined, true)
