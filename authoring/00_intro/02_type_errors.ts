//#title Type errors are the first teacher
//#kind fix
//#hint The annotation says string. Look at the value on the right.
//#hint Make the value a string that matches the check below.
/**
 * TypeScript will do a lot of the teaching in this course.
 * The CLI prints type errors just like your editor's red squiggles.
 *
 * Fix the type error. Do not change the check at the bottom.
 */

//#solution
const greeting: string = "hello"
//#exercise
const greeting: string = 42
//#end

check("greeting", greeting, "hello")
