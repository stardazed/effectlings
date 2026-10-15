//#title Translate: a switch on a tag
//#kind translate
//#deepens Match.type, Match.tag, Match.exhaustive
//#hint Each case of the switch becomes a Match.tag. The default that never happens becomes Match.exhaustive.
//#hint Match.type<Event>().pipe(Match.tag("Click", ...), Match.tag("Key", ...), Match.tag("Scroll", ...), Match.exhaustive)
/**
 * Plain TypeScript:
 *
 *   function describe(event: Event): string {
 *     switch (event._tag) {
 *       case "Click":  return `click at ${event.x},${event.y}`
 *       case "Key":    return `key ${event.key}`
 *       case "Scroll": return `scroll by ${event.dy}`
 *     }
 *   }
 *
 * Write the same with Match. Event is a plain union with a _tag field.
 */
import { Match } from "effect"

type Event =
  | { readonly _tag: "Click"; readonly x: number; readonly y: number }
  | { readonly _tag: "Key"; readonly key: string }
  | { readonly _tag: "Scroll"; readonly dy: number }

//#solution
const describe: (event: Event) => string = Match.type<Event>().pipe(
  Match.tag("Click", (e) => `click at ${e.x},${e.y}`),
  Match.tag("Key", (e) => `key ${e.key}`),
  Match.tag("Scroll", (e) => `scroll by ${e.dy}`),
  Match.exhaustive
)
//#exercise
const describe: (event: Event) => string = todo()
//#end

check("click", describe({ _tag: "Click", x: 1, y: 2 }), "click at 1,2")
check("key", describe({ _tag: "Key", key: "a" }), "key a")
check("scroll", describe({ _tag: "Scroll", dy: -5 }), "scroll by -5")
