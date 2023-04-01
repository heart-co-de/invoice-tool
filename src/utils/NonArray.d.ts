export type NonArray<TUnion> = TUnion extends any
  ? TUnion extends unknown[]
    ? never
    : TUnion
  : never
