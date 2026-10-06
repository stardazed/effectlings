/**
 * Stuck? Ask for a hint. Hints are revealed one at a time, easiest first.
 *
 *   in watch mode:  press h
 *   anywhere:       npm run hint
 *
 * After the last hint the CLI points you to the reference solution
 * in solutions/. Try the hints before you look at it.
 *
 * Goal: ask for a hint, then fill in the hole.
 */
import { check } from "../../src/check.ts"
import { todo } from "../../src/todo.ts"

const total: number = 2 + 3

check("total", total, 5)
