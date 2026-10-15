//#title Capstone: an inventory file
//#kind complete
//#teaches Arr.getSuccesses, Arr.getFailures
//#deepens Option.fromNullishOr, Option.filter, Option.map, Option.match, Result.succeed, Result.fail
//#hint parseLine: split on ":", turn the quantity into an Option, keep it only if it is a whole number, then match to a Result.
//#hint summarize: map the lines with parseLine, then Arr.getSuccesses and Arr.getFailures split the Results.
/**
 * Lines of an inventory file look like "pen:3". Some are broken.
 *
 * 1. parseLine(line): a Result with { sku, qty }, or the failure
 *    "bad line: <line>" when the quantity is missing or not a whole number.
 * 2. summarize(lines): { total, errors } where total is the sum of the
 *    good quantities and errors lists the failure messages.
 *
 * Arr.getSuccesses(results) and Arr.getFailures(results) pull the two
 * kinds out of an array of Results.
 */
import { Array as Arr, Option, Result } from "effect"

interface Item {
  readonly sku: string
  readonly qty: number
}

//#solution
const parseLine = (line: string): Result.Result<Item, string> => {
  const [sku, raw] = line.split(":")
  return Option.fromNullishOr(raw).pipe(
    Option.filter((r) => r !== "" && Number.isInteger(Number(r))),
    Option.map((r): Item => ({ sku, qty: Number(r) })),
    Option.match({
      onNone: () => Result.fail(`bad line: ${line}`),
      onSome: (item) => Result.succeed(item)
    })
  )
}

const summarize = (lines: ReadonlyArray<string>): { total: number; errors: Array<string> } => {
  const results = lines.map(parseLine)
  return {
    total: Arr.getSuccesses(results).reduce((sum, item) => sum + item.qty, 0),
    errors: Arr.getFailures(results)
  }
}
//#exercise
const parseLine = (line: string): Result.Result<Item, string> => todo()
const summarize = (lines: ReadonlyArray<string>): { total: number; errors: Array<string> } => todo()
//#end

check("good line", parseLine("pen:3"), Result.succeed({ sku: "pen", qty: 3 }))
check("missing quantity", parseLine("pad"), Result.fail("bad line: pad"))
check("not a number", parseLine("book:x"), Result.fail("bad line: book:x"))
check("empty quantity", parseLine("ink:"), Result.fail("bad line: ink:"))
check("summary", summarize(["pen:3", "book:x", "ink:5", "pad"]), { total: 8, errors: ["bad line: book:x", "bad line: pad"] })
