/**
 * Stream.paginate(seed, step) is unfold for APIs that return pages. step
 * receives the current cursor and returns an Effect of
 *
 *   [itemsOnThisPage, Option.some(nextCursor) | Option.none()]
 *
 * The consumer just sees one flat stream of items.
 *
 * Goal: turn the paged API into a stream of all its items.
 */
import { Effect, Option, Stream } from "effect"

const pages: Record<number, { items: Array<string>; next: Option.Option<number> }> = {
  1: { items: ["a", "b"], next: Option.some(2) },
  2: { items: ["c", "d"], next: Option.some(3) },
  3: { items: ["e"], next: Option.none() }
}
const fetchPage = (page: number) => Effect.succeed(pages[page])

const allItems: Effect.Effect<Array<string>> = Stream.paginate(1, (page) =>
  fetchPage(page).pipe(Effect.map((result) => [result.items, result.next] as const))
).pipe(Stream.runCollect)

check("all items", await Effect.runPromise(allItems), ["a", "b", "c", "d", "e"])
