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
import { check, rejection } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const fetchScore = (player: string): Promise<number> => Promise.resolve(player.length)
const fetchRank = (player: string): Promise<number> =>
  player === "ghost" ? Promise.reject(new Error("no such player")) : Promise.resolve(1)

const score = (player: string): Effect.Effect<number> => Effect.promise(() => fetchScore(player))
const rank = (player: string): Effect.Effect<number, string> =>
  Effect.tryPromise({
    try: () => fetchRank(player),
    catch: (error) => (error instanceof Error ? error.message : String(error))
  })

check("score", await Effect.runPromise(score("ada")), 3)
check("rank", await Effect.runPromise(rank("ada")), 1)
check("rank of a missing player", await rejection(Effect.runPromise(rank("ghost"))), "no such player")
