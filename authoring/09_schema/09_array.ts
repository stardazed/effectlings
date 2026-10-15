//#title Arrays
//#kind complete
//#teaches Schema.Array
//#hint Schema.Array takes the schema of one element.
//#hint Schema.Array(Schema.Number)
/**
 * Schema.Array(item) describes an array whose elements all fit `item`.
 * Every element is checked.
 *
 * Goal: a schema for an array of numbers.
 */
import { Schema } from "effect"

//#solution
const Scores: Schema.Codec<ReadonlyArray<number>> = Schema.Array(Schema.Number)
//#exercise
const Scores: Schema.Codec<ReadonlyArray<number>> = todo()
//#end

const decode = Schema.decodeUnknownSync(Scores)

check("numbers", decode([1, 2, 3]), [1, 2, 3])
check("empty", decode([]), [])
check("one bad element spoils it", thrown(() => decode([1, "2", 3])) !== undefined, true)
check("not an array", thrown(() => decode("1,2,3")) !== undefined, true)
