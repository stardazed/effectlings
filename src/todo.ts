/**
 * A placeholder that type-checks anywhere (its type is `never`)
 * and throws when it is evaluated. Replace it with your code.
 */
export const todo = (note: string = "replace this with your code"): never => {
  throw new Error(`todo(): ${note}`)
}
