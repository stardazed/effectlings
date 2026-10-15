//#title Translate: promise-returning functions
//#kind translate
//#deepens Effect.promise, Effect.tryPromise
//#hint fetchScore never rejects. fetchRank can.
//#hint promise for the first, tryPromise for the second.
//#hint catch: (error) => (error instanceof Error ? error.message : String(error)), the same narrowing as in the tryPromise exercise.
/**
 * Plain TypeScript you might already have:
 *
 *   const fetchScore = (player: string): Promise<number> => ...   // never rejects
 *   const fetchRank  = (player: string): Promise<number> => ...   // can reject
 *
 * Expose both as Effects. Remember that an Effect must not start the
 * promise until it is run.
 */
import { Effect } from "effect"

const fetchScore = (player: string): Promise<number> => Promise.resolve(player.length)
const fetchRank = (player: string): Promise<number> =>
  player === "ghost" ? Promise.reject(new Error("no such player")) : Promise.resolve(1)

//#solution
const score = (player: string): Effect.Effect<number> => Effect.promise(() => fetchScore(player))
const rank = (player: string): Effect.Effect<number, string> =>
  Effect.tryPromise({
    try: () => fetchRank(player),
    catch: (error) => (error instanceof Error ? error.message : String(error))
  })
//#exercise
const score = (player: string): Effect.Effect<number> => todo()
const rank = (player: string): Effect.Effect<number, string> => todo()
//#end

check("score", await Effect.runPromise(score("ada")), 3)
check("rank", await Effect.runPromise(rank("ada")), 1)
check("rank of a missing player", await rejection(Effect.runPromise(rank("ghost"))), "no such player")
