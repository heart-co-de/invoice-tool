/**
 * Helps to resolve the type of a type that may contain complex Generics. It nails down the type to the concrete type without any generic notation.
 */
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unused-vars
type Resolve<T> = T extends Function ? T : { [K in keyof T]: Resolve<T[K]> }
