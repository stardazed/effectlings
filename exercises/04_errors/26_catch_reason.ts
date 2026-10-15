/**
 * Some errors have several causes that callers treat differently, for
 * example an AiError that is really a rate limit, or a quota problem.
 * Model this with a tagged `reason` field:
 *
 *   class AiError extends Data.TaggedError("AiError")<{
 *     readonly reason: RateLimited | QuotaExceeded
 *   }> {}
 *
 * Effect.catchReason("AiError", "RateLimited", handler) recovers from just
 * one reason. The AiError stays in E for the reasons you did not handle.
 *
 * Goal: recover from RateLimited by answering "retry in <n>s".
 * QuotaExceeded must still fail with the AiError.
 */
// I AM NOT DONE
import { Data, Effect } from "effect"

class RateLimited extends Data.TaggedError("RateLimited")<{ readonly retryAfter: number }> {}
class QuotaExceeded extends Data.TaggedError("QuotaExceeded")<{ readonly limit: number }> {}
class AiError extends Data.TaggedError("AiError")<{ readonly reason: RateLimited | QuotaExceeded }> {}

const callModel = (reason: RateLimited | QuotaExceeded): Effect.Effect<string, AiError> =>
  Effect.fail(new AiError({ reason }))

const handled = (reason: RateLimited | QuotaExceeded): Effect.Effect<string, AiError> => todo()

check("rate limited", await Effect.runPromise(handled(new RateLimited({ retryAfter: 5 }))), "retry in 5s")
const error = await rejection(Effect.runPromise(handled(new QuotaExceeded({ limit: 100 }))))
check("quota exceeded still fails", error instanceof AiError && error.reason._tag === "QuotaExceeded", true)
