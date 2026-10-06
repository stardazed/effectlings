/** Type-level equality: `Equal<A, B>` is `true` only when A and B are identical. */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false

/** `Expect<Equal<A, B>>` compiles only when the two types are identical. */
export type Expect<T extends true> = T
