/**
 * runCollect keeps every value. Often you only want one answer:
 *
 *   Stream.runFold(() => initial, (acc, value) => acc)   reduce to one value
 *   Stream.runSum                                        add up numbers
 *   Stream.runCount                                      how many values
 *
 * Goal: the product of 1..5 with runFold, then the sum and the count of the same numbers.
 */
import { Effect, Stream } from "effect"
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const numbers = Stream.range(1, 5)

const product: Effect.Effect<number> = numbers.pipe(Stream.runFold(() => 1, (acc: number, n: number) => acc * n))
const sum: Effect.Effect<number> = numbers.pipe(Stream.runSum)
const count: Effect.Effect<number> = numbers.pipe(Stream.runCount)

check("product", await Effect.runPromise(product), 120)
check("sum", await Effect.runPromise(sum), 15)
check("count", await Effect.runPromise(count), 5)
