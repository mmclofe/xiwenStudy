// NonNullable<Type>
// Constructs a type by excluding null and undefined from Type.

type MyNonNullable<T> = T extends null | undefined ? never : T

// test
type T0 = NonNullable<string | number | undefined | null>