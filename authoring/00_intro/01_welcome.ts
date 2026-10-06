//#title Welcome
//#kind complete
//#hint Replace todo() with a number.
//#hint The check at the bottom says which number.
/**
 * Welcome to effectlings.
 *
 * Every file is one small exercise. Your job is to make it pass:
 * no type errors, and every check at the bottom prints "ok".
 *
 * This one has a hole marked todo(). Replace it with the answer to
 * life, the universe and everything, then save the file.
 *
 * When an exercise passes, delete the "// I AM NOT DONE" line under this
 * comment. That tells the CLI you are finished and moves you to the next one.
 */
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

//#solution
const answer: number = 42
//#exercise
const answer: number = todo()
//#end

check("the answer", answer, 42)
