//#title Errors are values with a tag
//#kind fix
//#teaches Data.TaggedError
//#hint A tagged error class extends Data.TaggedError("Name"). The type argument lists the fields.
//#hint class Forbidden extends Data.TaggedError("Forbidden")<{ readonly user: string }> {}
/**
 * In Effect, an error is an ordinary value. The habit is to give each kind
 * of error its own class with a `_tag`, so code can tell them apart:
 *
 *   class NotFound extends Data.TaggedError("NotFound")<{ readonly id: number }> {}
 *
 *   const error = new NotFound({ id: 7 })
 *   error._tag   // "NotFound"
 *   error.id     // 7
 *
 * The string is the tag. The object type lists the fields.
 * These classes are real Error objects, so they carry a stack trace.
 *
 * Goal: make Forbidden a tagged error with a `user` field.
 */
import { Data } from "effect"
import { check } from "../../src/check.ts"

//#solution
class Forbidden extends Data.TaggedError("Forbidden")<{ readonly user: string }> {}
//#exercise
class Forbidden {}
//#end

const error = new Forbidden({ user: "ada" })
check("tag", error._tag, "Forbidden")
check("field", error.user, "ada")
check("is an Error", error instanceof Error, true)
